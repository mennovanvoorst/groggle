import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './Badge';

describe('Badge', () => {
  it.each([['success'], ['error']])(
    'Renders component as %p',
    async (variant) => {
      const variantType = variant as 'success' | 'error';

      render(<Badge variant={variantType} label={variant} />);

      const badge = await screen.findByTestId('badge');

      expect(badge).toBeTruthy();
      expect(badge.textContent).toContain(variant);
    },
  );
});
