"use client";

interface ScreenshotViewerProps {
  url: string;
  onClose: () => void;
}

export function ScreenshotViewer({ url, onClose }: ScreenshotViewerProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-lg w-full max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-text-secondary hover:text-text-primary text-2xl"
        >
          &times;
        </button>
        <img src={url} alt="Payment screenshot" className="w-full h-auto rounded-lg object-contain max-h-[80vh]" />
      </div>
    </div>
  );
}
