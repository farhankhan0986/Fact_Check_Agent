import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { extractText, getDocumentProxy } from 'unpdf';
import { extractClaims } from '@/services/claim-extractor';
import { verifyClaim } from '@/services/claim-verifier';
import { setReport } from '@/lib/report-store';

async function extractPDFText(buffer) {
  try {
    const uint8Array = new Uint8Array(buffer);
    const pdf = await getDocumentProxy(uint8Array);
    const { text } = await extractText(pdf, { mergePages: true });
    const trimmed = text?.trim() ?? '';
    console.log('PDF PARSE SUCCESS — chars:', trimmed.length);
    console.log('PDF TEXT PREVIEW:', trimmed.slice(0, 300));
    return trimmed;
  } catch (err) {
    console.error('PDF PARSE ERROR:', err.message);
    return '';
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const isPDF = file.name?.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    if (!isPDF) {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log('BUFFER SIZE:', buffer.length, 'bytes');

    const text = await extractPDFText(buffer);

    if (!text || text.length < 30) {
      return NextResponse.json(
        { error: 'Could not extract readable text from this PDF. Please ensure it contains selectable text and is not a scanned image.' },
        { status: 422 }
      );
    }

    const claims = await extractClaims(text);
    console.log('CLAIMS EXTRACTED:', claims.length);

    if (claims.length === 0) {
      return NextResponse.json(
        { error: 'No verifiable factual claims found in this document.' },
        { status: 422 }
      );
    }

    const verifiedClaims = await Promise.all(
      claims.map(async (claim) => {
        const verification = await verifyClaim(claim);
        return { ...claim, ...verification };
      })
    );

    const total = verifiedClaims.length;
    const statusCounts = verifiedClaims.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] ?? 0) + 1;
      return acc;
    }, {});

    const typeCounts = verifiedClaims.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] ?? 0) + 1;
      return acc;
    }, {});

    const avgConfidence = Math.round(
      verifiedClaims.reduce((sum, c) => sum + (c.confidence ?? 0), 0) / total
    );

    const accuracy = Math.round(((statusCounts.verified ?? 0) / total) * 100);

    const report = {
      id: uuidv4(),
      filename: file.name,
      processedAt: new Date().toISOString(),
      claims: verifiedClaims,
      summary: {
        total,
        verified: statusCounts.verified ?? 0,
        inaccurate: statusCounts.inaccurate ?? 0,
        false: statusCounts.false ?? 0,
        outdated: statusCounts.outdated ?? 0,
        avgConfidence,
        accuracy,
        typeCounts,
      },
    };

    setReport(report.id, report);
    console.log('REPORT STORED:', report.id, '|', total, 'claims');

    return NextResponse.json({ id: report.id, summary: report.summary, filename: report.filename });
  } catch (error) {
    console.error('PROCESS ROUTE ERROR:', error);
    return NextResponse.json({ error: error.message ?? 'Processing failed' }, { status: 500 });
  }
}
