import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose
}) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#3A86FF] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#D62828] shrink-0" />
  };

  const bgStyles = {
    success: 'bg-[#F0F4EF] border-[#2D6A4F]/30 text-[#1A2E1A]',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    error: 'bg-red-50 border-red-200 text-red-900'
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-[12px] border shadow-lg max-w-md animate-in slide-in-from-bottom-5 duration-200 ${bgStyles[type]}`}>
      {icons[type]}
      <p className="text-sm font-medium pr-2">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:opacity-75 transition-opacity rounded-full ml-auto cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
