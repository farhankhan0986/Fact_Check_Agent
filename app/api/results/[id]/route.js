import { NextResponse } from 'next/server';
import { getReport } from '@/lib/report-store';

export async function GET(request, { params }) {
  const { id } = await params;
  const report = getReport(id);

  if (!report) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }

  return NextResponse.json(report);
}
