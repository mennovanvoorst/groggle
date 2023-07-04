import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Score } from './Score';
import { GameContext, GameProvider, initialGameContext } from '@/providers';

describe('Score', () => {
  it('Renders component', async () => {
    render(
      <GameProvider>
        <Score />
      </GameProvider>,
    );

    expect(await screen.findByTestId('score')).toBeTruthy();
  });

  it('Renders score with correct value', async () => {
    render(
      <GameContext.Provider value={{ ...initialGameContext, score: 10 }}>
        <Score />
      </GameContext.Provider>,
    );

    const scoreValue = await screen.findByTestId('score-value');

    expect(scoreValue.textContent).toContain('Your score: 10');
  });

  it('Should format and render the current word', async () => {
    const baseCell = {
      x: 0,
      y: 0,
      selected: true,
      ref: null,
    };

    const component = render(
      <GameContext.Provider
        value={{
          ...initialGameContext,
          selectedCells: [
            {
              ...baseCell,
              letter: 't',
            },
            {
              ...baseCell,
              letter: 'e',
            },
            {
              ...baseCell,
              letter: 's',
            },
            {
              ...baseCell,
              letter: 't',
            },
          ],
        }}
      >
        <Score />
      </GameContext.Provider>,
    );

    const currentWord = await screen.findByTestId('current-word');

    expect(currentWord.textContent).toContain('test');
  });

  it('Should call reset when reset button is clicked', async () => {
    const handleReset = jest.fn();

    render(
      <GameContext.Provider
        value={{ ...initialGameContext, reset: handleReset }}
      >
        <Score />
      </GameContext.Provider>,
    );

    const resetButton = await screen.findByTestId('reset-button');
    resetButton.click();

    expect(handleReset).toBeCalled();
  });
});
