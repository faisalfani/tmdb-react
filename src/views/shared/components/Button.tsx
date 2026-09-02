import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...restProps
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...restProps}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
}
