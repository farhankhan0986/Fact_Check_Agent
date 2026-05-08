'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProcessingSteps from './ProcessingSteps';

export default function UploadZone() {
  const router = useRouter();
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFile = useCallback((f) => {
    if (!f) return;
    const isPDF = f.type === 'application/pdf' || f.type === 'application/octet-stream' || f.name?.toLowerCase().endsWith('.pdf');
    if (!isPDF) {
      setError('Please upload a valid PDF file.');
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setError('File size must be under 20 MB.');
      return;
    }
    setError('');
    setFile(f);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setProgress(0);
    setError('');

    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 8, 85));
    }, 800);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/process', { method: 'POST', body: formData });
      clearInterval(interval);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Processing failed');
      }

      setProgress(100);
      const data = await res.json();
      setTimeout(() => router.push(`/results/${data.id}`), 400);
    } catch (err) {
      clearInterval(interval);
      setProcessing(false);
      setProgress(0);
      setError(err.message);
    }
  };

  if (processing) {
    return <ProcessingSteps progress={progress} filename={file?.name} />;
  }

  return (
    <div className="max-w-xl mx-auto w-full">
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
          dragOver ? 'border-[#52525b] bg-[#18181b]' : 'border-[#27272a] bg-[#111113] hover:border-[#3f3f46] hover:bg-[#18181b]'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <div className="w-12 h-12 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2V14M11 2L7 6M11 2L15 6" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 16V18C2 19.1 2.9 20 4 20H18C19.1 20 20 19.1 20 18V16" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {file ? (
          <div>
            <p className="text-sm font-medium text-[#fafafa] mb-1">{file.name}</p>
            <p className="text-xs text-[#71717a]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-[#fafafa] mb-1">Drop your PDF here</p>
            <p className="text-xs text-[#71717a]">or click to browse — max 20 MB</p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-3 text-xs text-[#f87171] text-center">{error}</p>
      )}

      {file && !error && (
        <div className="mt-4 p-3 border border-[#27272a] rounded-lg bg-[#111113] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#18181b] border border-[#27272a] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="#a1a1aa" strokeWidth="1.2" />
                <path d="M4 5H10M4 7H8M4 9H6" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-[#fafafa]">{file.name}</p>
              <p className="text-xs text-[#52525b]">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setFile(null); }}
            className="text-[#52525b] hover:text-[#a1a1aa] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <button
        onClick={handleProcess}
        disabled={!file || !!error}
        className="mt-4 w-full bg-[#fafafa] text-[#09090b] py-2.5 rounded-md text-sm font-medium hover:bg-[#e4e4e7] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Verify Claims
      </button>
    </div>
  );
}
