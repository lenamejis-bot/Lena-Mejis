import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-[8px] gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-[12px] gap-2',
    lg: 'text-base px-6 py-3.5 rounded-[12px] gap-2.5 font-semibold'
  }[size];

  const variantClasses = {
    primary: 'bg-[#2D6A4F] text-white hover:bg-[#245840] shadow-sm',
    secondary: 'bg-[#F0F4EF] text-[#2D6A4F] hover:bg-[#E2ECE0]',
    accent: 'bg-[#F77F00] text-white hover:bg-[#E07200] shadow-sm',
    outline: 'border-1.5 border-[#2D6A4F] text-[#2D6A4F] bg-transparent hover:bg-[#F0F4EF]',
    ghost: 'text-[#4A6741] hover:bg-[#F0F4EF] hover:text-[#1A2E1A]',
    danger: 'bg-[#D62828] text-white hover:bg-[#B92020]'
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
