import React from 'react';
import './Button.scss';

type ButtonProps = {
  label: string;
} & JSX.IntrinsicElements['button'];

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      className="button"
      data-testid="button"
      {...props}
    >
      {label}
    </button>
  ),
);

export { Button };
