import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Wordlist } from './Wordlist';
import { GameContext, GameProvider, initialGameContext } from '@/providers';

describe('Wordlist', () => {
  it('Renders component', async () => {
    render(
      <GameProvider>
        <Wordlist />
      </GameProvider>,
    );

    expect(await screen.findByTestId('wordlist')).toBeTruthy();
  });

  it.each([
    [{ test: true }, 'Correct'],
    [{ slddsf: false }, 'Incorrect'],
  ])(
    'Renders %p in the list with the correct status',
    async (guessedWords, text) => {
      render(
        <GameContext.Provider value={{ ...initialGameContext, guessedWords }}>
          <Wordlist />
        </GameContext.Provider>,
      );

      const listItem = await screen.findByText(Object.keys(guessedWords)[0]);

      expect(listItem).toBeTruthy();
      expect(listItem.textContent).toContain(text);
    },
  );

  it('Renders the list in reverse', async () => {
    render(
      <GameContext.Provider
        value={{
          ...initialGameContext,
          guessedWords: { firstWord: true, lastWord: true },
        }}
      >
        <Wordlist />
      </GameContext.Provider>,
    );

    const listItems = await screen.findAllByTestId('listitem');

    expect(listItems[0].textContent).toContain('lastWord');
    expect(listItems[1].textContent).toContain('firstWord');
  });
});
