import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl'
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A2E1A]/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className={`relative transform overflow-hidden rounded-[24px] bg-white text-left shadow-2xl transition-all sm:my-8 w-full ${maxWidthClasses} border border-[#D4E4D0] animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header */}
          {(title || subtitle) && (
            <div className="flex items-start justify-between p-6 pb-4 border-b border-[#E8EFE6]">
              <div>
                {title && <h3 className="text-xl font-bold text-[#1A2E1A] font-serif-heading">{title}</h3>}
                {subtitle && <p className="text-sm text-[#4A6741] mt-0.5">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-[#4A6741] hover:bg-[#F0F4EF] hover:text-[#1A2E1A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Close button if no header */}
          {!title && !subtitle && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-[#4A6741] hover:bg-[#F0F4EF] hover:text-[#1A2E1A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
