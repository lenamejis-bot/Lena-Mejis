import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#4A6741]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8FAE8A]">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full h-12 bg-white rounded-[12px] border ${
            error ? 'border-[#D62828] focus:border-[#D62828] focus:ring-[#D62828]' : 'border-[#D4E4D0] focus:border-[#2D6A4F] focus:ring-[#2D6A4F]'
          } ${icon ? 'pl-10' : 'px-4'} pr-4 text-sm text-[#1A2E1A] placeholder-[#8FAE8A] focus:outline-none focus:ring-1 transition-colors ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-[#D62828] font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-[#4A6741]">{helperText}</p>}
    </div>
  );
};
