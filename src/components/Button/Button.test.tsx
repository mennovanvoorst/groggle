import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button', () => {
  it('Renders component with label', async () => {
    const label = 'this is a button!';

    render(<Button label={label} />);

    const button = await screen.findByTestId('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain(label);
  });
});
