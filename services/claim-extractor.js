import groq from '@/lib/groq';
import { v4 as uuidv4 } from 'uuid';

const SYSTEM_PROMPT = `You are a factual claim extraction system.

Extract factual claims from the provided text.

Focus ONLY on:
- statistics
- percentages
- financial numbers
- dates
- historical facts
- measurable statements
- technical claims
- company/user metrics

Return ONLY valid raw JSON.

Each object must follow this structure:

{
  "claim": "exact factual statement",
  "type": "statistic | percentage | financial | date | technical | historical | metric",
  "uploadedValue": "exact number/date/value mentioned"
}

Rules:
- Extract 8-15 claims
- No markdown
- No explanations
- No extra text
- No code blocks
- Return ONLY JSON array`;

function classifyType(sentence) {
  if (/\$|billion|trillion|million|revenue|market|gdp/i.test(sentence)) return 'financial';
  if (/%/.test(sentence)) return 'percentage';
  if (/\b(19|20)\d{2}\b/.test(sentence) && !/\d+%/.test(sentence)) return 'date';
  if (/users|downloads|installs|subscribers|customers|employees/i.test(sentence)) return 'metric';
  if (/speed|capacity|bandwidth|processor|memory|storage|hz|ghz|tb|gb/i.test(sentence)) return 'technical';
  return 'statistic';
}

function extractUploadedValue(sentence) {
  const financial = sentence.match(/\$[\d.,]+\s*(?:billion|trillion|million)?/i);
  if (financial) return financial[0];
  const pct = sentence.match(/[\d.,]+%/);
  if (pct) return pct[0];
  const year = sentence.match(/\b(19|20)\d{2}\b/);
  if (year) return year[0];
  const num = sentence.match(/[\d.,]+\s*(?:billion|trillion|million|thousand)?/i);
  if (num) return num[0].trim();
  return 'N/A';
}

function regexFallbackExtraction(text) {
  const patterns = [
    /[^.!?\n]*\b\d+(?:\.\d+)?%[^.!?\n]*/g,
    /[^.!?\n]*\$[\d.,]+\s*(?:billion|trillion|million)[^.!?\n]*/gi,
    /[^.!?\n]*\b(?:19|20)\d{2}\b[^.!?\n]*(?:launched|released|founded|reached|grew|declined|increased|decreased)[^.!?\n]*/gi,
    /[^.!?\n]*\b\d+(?:\.\d+)?\s*(?:billion|trillion|million)\b[^.!?\n]*/gi,
    /[^.!?\n]*\b(?:reached|grew to|increased to|decreased to|fell to|rose to)\s+[\d.,]+[^.!?\n]*/gi,
  ];

  const seen = new Set();
  const claims = [];

  for (const pattern of patterns) {
    const matches = text.match(pattern) ?? [];
    for (const match of matches) {
      const cleaned = match.trim().replace(/\s+/g, ' ');
      if (cleaned.length < 40 || cleaned.length > 300) continue;
      if (!/[a-zA-Z]{3,}/.test(cleaned)) continue;
      if (seen.has(cleaned)) continue;
      seen.add(cleaned);
      claims.push({
        id: uuidv4(),
        claim: cleaned,
        type: classifyType(cleaned),
        uploadedValue: extractUploadedValue(cleaned),
      });
      if (claims.length >= 12) break;
    }
    if (claims.length >= 12) break;
  }

  return claims;
}

export async function extractClaims(text) {
  if (!process.env.GROQ_API_KEY) {
    console.log('GROQ_API_KEY not set — using regex fallback extraction');
    const fallback = regexFallbackExtraction(text);
    if (fallback.length > 0) return fallback;
    return [];
  }

  try {
    const truncatedText = text.slice(0, 14000);

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Extract factual claims from this text:\n\n${truncatedText}` },
      ],
      temperature: 0.1,
      max_tokens: 2500,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? '';
    console.log('RAW GROQ RESPONSE:', raw.slice(0, 500));

    const cleaned = raw
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    console.log('CLEANED RESPONSE:', cleaned.slice(0, 300));

    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('CLAIM EXTRACTION: no JSON array found in response');
      return regexFallbackExtraction(text);
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      console.error('CLAIM EXTRACTION: parsed result is empty or not an array');
      return regexFallbackExtraction(text);
    }

    const claims = parsed
      .filter((c) => c && typeof c.claim === 'string' && c.claim.trim().length > 10)
      .map((c) => ({
        id: uuidv4(),
        claim: c.claim.trim(),
        type: c.type ?? classifyType(c.claim),
        uploadedValue: c.uploadedValue ?? extractUploadedValue(c.claim),
      }));

    if (claims.length === 0) {
      console.error('CLAIM EXTRACTION: all parsed claims were filtered out — falling back');
      return regexFallbackExtraction(text);
    }

    console.log(`CLAIM EXTRACTION: extracted ${claims.length} claims via Groq`);
    return claims;
  } catch (error) {
    console.error('CLAIM EXTRACTION ERROR:', error);
    const fallback = regexFallbackExtraction(text);
    console.log(`CLAIM EXTRACTION FALLBACK: extracted ${fallback.length} claims via regex`);
    return fallback;
  }
}
