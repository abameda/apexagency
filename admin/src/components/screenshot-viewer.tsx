"use client";

interface ScreenshotViewerProps {
  url: string;
  onClose: () => void;
}

export function ScreenshotViewer({ url, onClose }: ScreenshotViewerProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-lg w-full max-h-[80vh] animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-hover-strong transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div className="bg-surface border border-border rounded-2xl p-2 overflow-hidden">
          <img src={url} alt="Payment screenshot" className="w-full h-auto rounded-xl object-contain max-h-[75vh]" />
        </div>
      </div>
    </div>
  );
}
