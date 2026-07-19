import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-full
    px-7 py-3.5
    font-sans font-bold text-[15px]
    transition-all duration-300
    cursor-pointer
    hover:-translate-y-0.5
    hover:shadow-lg
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    disabled:opacity-50
    disabled:pointer-events-none
  `;

  const variants = {
    primary: `
      bg-ink
      text-brand-white
      border-none
      hover:opacity-95
    `,
    ghost: `
      bg-transparent
      text-ink
      border-2 border-ink
      hover:bg-ink
      hover:text-brand-white
    `,
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}