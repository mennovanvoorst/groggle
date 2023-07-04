import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Board } from './Board';
import { GameContext, GameProvider, initialGameContext } from '@/providers';
import { BOARD_SIZE } from '@/constants';

describe('Board', () => {
  it('Renders component', async () => {
    render(<Board />);

    const board = await screen.findByTestId('board');
    expect(board).toBeTruthy();
  });

  it('Should reset board on initial load', async () => {
    const reset = jest.fn();

    render(
      <GameContext.Provider value={{ ...initialGameContext, reset }}>
        <Board />
      </GameContext.Provider>,
    );

    expect(reset).toHaveBeenCalledTimes(1);
  });

  it('Should render all cells', async () => {
    render(
      <GameProvider>
        <Board />
      </GameProvider>,
    );

    const cells = await screen.findAllByTestId('cell');

    expect(cells.length).toBe(BOARD_SIZE * BOARD_SIZE);
  });

  it('Should render message if message is set', async () => {
    const reset = jest.fn();

    render(
      <GameContext.Provider
        value={{
          ...initialGameContext,
          reset,
          message: {
            state: 'error',
            message: 'Not long enough',
          },
        }}
      >
        <Board />
      </GameContext.Provider>,
    );

    const message = await screen.findAllByTestId('message');

    expect(message).toBeTruthy();
  });
});
