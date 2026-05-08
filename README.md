# FactLens — AI-Powered PDF Fact Checker

**Live Demo → [fact-check-agent.vercel.app](https://fact-check-agent.vercel.app)**

FactLens is a production-ready SaaS application that extracts factual claims from uploaded PDF documents and verifies each one against live web data using Groq LLMs and Tavily Search. It is designed to catch fake statistics, hallucinated numbers, outdated percentages, and fabricated facts.

---

## Features

- **Claim Extraction** — Automatically identifies statistics, percentages, financial figures, dates, and technical claims from any PDF
- **Live Web Verification** — Each claim is searched against live web sources via Tavily and cross-referenced using Groq LLaMA 3.3
- **Corrected Facts** — Side-by-side comparison of the uploaded value vs. the verified actual value
- **Confidence Scoring** — Every claim receives a 0–100 confidence score based on source quality and evidence consensus
- **Status Classification** — Claims are classified as Verified, Inaccurate, Outdated, or False with explanations and source citations
- **Analytics Dashboard** — Visual breakdown of results including accuracy rate, claim type distribution, and a donut chart
- **Export** — Download results as JSON or CSV
- **Fully Responsive** — Clean, professional dark-mode UI that works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript (ES Modules) |
| Styling | Tailwind CSS v4 |
| LLM | Groq API — LLaMA 3.3 70B Versatile |
| Web Search | Tavily Search API |
| PDF Parsing | unpdf (pdfjs-dist) |
| Charts | Recharts |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## Project Structure

```
fact-check-agent/
├── app/
│   ├── page.js                  # Landing page
│   ├── dashboard/page.js        # Upload dashboard
│   ├── results/[id]/page.js     # Verification report
│   └── api/
│       ├── process/route.js     # Main pipeline (PDF → claims → verify)
│       └── results/[id]/route.js
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── landing/                 # Hero, Features, HowItWorks
│   ├── dashboard/               # UploadZone, ProcessingSteps
│   └── results/                 # ClaimsTable, ConfidenceMeter, AnalyticsCards, Charts
├── lib/
│   ├── groq.js                  # Groq client
│   ├── tavily.js                # Tavily search client
│   └── report-store.js          # In-memory report storage
├── services/
│   ├── claim-extractor.js       # LLM-based claim extraction + regex fallback
│   └── claim-verifier.js        # Search + LLM verification pipeline
└── utils/
    └── report-generator.js      # JSON / CSV export
```

---

## How It Works

```
PDF Upload
    │
    ▼
Extract text (unpdf / pdfjs-dist)
    │
    ▼
Extract claims (Groq LLaMA 3.3 70B)
→ Falls back to regex if LLM returns empty
    │
    ▼
For each claim:
    ├── Search live web (Tavily)
    └── Verify + classify (Groq LLaMA 3.3 70B)
            │
            ▼
    { status, confidence, correctFact, actualValue, explanation, sources }
    │
    ▼
Store report → redirect to /results/[id]
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/farhankhan0986/Fact_Check_Agent.git
cd Fact_Check_Agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

Get your API keys:
- **Groq** → [console.groq.com](https://console.groq.com)
- **Tavily** → [tavily.com](https://tavily.com)

> The app includes graceful fallbacks — it will run without API keys using mock data and regex-based extraction, but live verification requires both keys.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

```bash
npm i -g vercel
vercel --prod
```

Set `GROQ_API_KEY` and `TAVILY_API_KEY` in your Vercel project's environment variables dashboard.

---

## Verification Logic

### Claim Extraction

1. PDF text is extracted using `unpdf` (pdfjs-dist under the hood)
2. Text is sent to **Groq LLaMA 3.3 70B** with a structured JSON extraction prompt
3. If the LLM returns empty or malformed JSON, a **regex fallback** dynamically extracts sentences containing percentages, financial figures, years, and measurable statements directly from the PDF text

### Claim Verification

For each extracted claim:
1. **Tavily** fetches the top 4 live search results
2. Evidence is compiled and sent to **Groq LLaMA 3.3 70B** with the claim
3. The LLM returns a structured verdict:

| Status | Meaning |
|---|---|
| ✅ Verified | Claim substantially matches trusted evidence |
| ⚠️ Inaccurate | Mostly true but contains a meaningfully wrong figure |
| 🕐 Outdated | Was accurate previously; newer data supersedes it |
| ❌ False | Fabricated, impossible, or clearly contradicted |

---

## What It Catches

The system is specifically designed to detect:

- Inflated or fabricated statistics (e.g. "950 million internet users" when actual is 759 million)
- Hallucinated AI-generated numbers
- Outdated market figures presented as current
- Impossible claims (e.g. "100% accuracy in all medical diagnoses")
- Incorrect dates and launch timelines
- Misattributed financial data

---

## License

MIT

---

## Author

**Farhan Khan**

E-mail → farhankhan080304@gmail.com

GitHub → [github.com/farhankhan0986](https://github.com/farhankhan0986)
