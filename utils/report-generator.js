export function generateJSONReport(report) {
  return JSON.stringify(
    {
      reportId: report.id,
      filename: report.filename,
      processedAt: report.processedAt,
      summary: report.summary,
      claims: report.claims.map((c) => ({
        claim: c.claim,
        type: c.type,
        status: c.status,
        confidence: c.confidence,
        uploadedValue: c.uploadedValue,
        actualValue: c.actualValue,
        correctFact: c.correctFact,
        explanation: c.explanation,
        sources: c.sources,
      })),
    },
    null,
    2
  );
}

export function generateCSVReport(report) {
  const headers = ['Claim', 'Type', 'Status', 'Confidence', 'Uploaded Value', 'Actual Value', 'Explanation', 'Source URL'];
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

  const rows = report.claims.map((c) =>
    [
      escape(c.claim),
      escape(c.type),
      escape(c.status),
      escape(`${c.confidence}%`),
      escape(c.uploadedValue),
      escape(c.actualValue),
      escape(c.explanation),
      escape(c.sources?.[0]?.url ?? ''),
    ].join(',')
  );

  return [headers.map(escape).join(','), ...rows].join('\n');
}
