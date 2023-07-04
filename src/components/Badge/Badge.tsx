import classNames from 'classnames';
import './Badge.scss';

type BadgeProps = {
  variant: 'success' | 'error';
  label: string;
};

const Badge = ({ variant, label }: BadgeProps) => {
  const classes = classNames('badge', {
    'badge--success': variant === 'success',
    'badge--error': variant === 'error',
  });

  return (
    <span className={classes} data-testid="badge">
      {label}
    </span>
  );
};

export { Badge };
