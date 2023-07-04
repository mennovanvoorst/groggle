import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Line } from './Line';
import { GameContext, GameProvider, initialGameContext } from '@/providers';

describe('Line', () => {
  it('Renders component', async () => {
    render(<Line top={0} left={0} height={0} ang={0} />);

    expect(await screen.findByTestId('line')).toBeTruthy();
  });
});
