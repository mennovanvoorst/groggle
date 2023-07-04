import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Message } from './Message';

describe('Message', () => {
  it.each([['success'], ['error'], ['default']])(
    'Renders component as %p',
    async (state) => {
      const stateType = state as 'error' | 'success' | 'default';

      render(<Message state={stateType} message={state} />);

      const message = await screen.findByTestId('message');

      expect(message).toBeTruthy();
      expect(message.textContent).toContain(state);
    },
  );
});
