import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'protein' | 'fiber' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'sm',
  children,
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  const variantClasses = {
    primary: 'bg-[#2D6A4F]/10 text-[#2D6A4F]',
    secondary: 'bg-[#52B788]/15 text-[#245840]',
    accent: 'bg-[#F77F00]/15 text-[#C46500] font-semibold',
    neutral: 'bg-stone-100 text-stone-700',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    protein: 'bg-blue-50 text-blue-700 font-medium',
    fiber: 'bg-emerald-50 text-emerald-800 font-medium',
    outline: 'border border-[#D4E4D0] text-[#4A6741] bg-white'
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1 rounded-[6px] font-medium tracking-tight ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
