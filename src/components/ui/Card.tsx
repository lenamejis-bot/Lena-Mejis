import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'outline' | 'flat';
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-white rounded-[20px] border border-[#E8EFE6] shadow-[0_2px_12px_rgba(45,106,79,0.06)]',
    surface: 'bg-[#F0F4EF] rounded-[20px] border border-[#D4E4D0]',
    outline: 'bg-white rounded-[20px] border border-[#D4E4D0]',
    flat: 'bg-[#FAFAF7] rounded-[16px] border border-[#E5EBE3]'
  }[variant];

  const hoverClass = hoverEffect
    ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] hover:border-[#52B788]/40'
    : '';

  return (
    <div className={`${variantClasses} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  );
};
