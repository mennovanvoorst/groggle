import { Board } from '@/components/Board';
import './App.scss';
import { GameProvider } from '@/providers';
import { Wordlist } from '../Wordlist';
import { Score } from '../Score';

const App = () => {
  return (
    <GameProvider>
      <main className="game">
        <Score />
        <Board />
        <Wordlist />
      </main>
    </GameProvider>
  );
};

export { App };
