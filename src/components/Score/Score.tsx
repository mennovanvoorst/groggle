import { useGame } from '@/providers';
import './Score.scss';
import { formatWord } from '@/utils';
import { Button } from '../Button';

const Score = () => {
  const { score, selectedCells, reset } = useGame();

  const currentWord = formatWord([...selectedCells]);

  return (
    <div className="score" data-testid="score">
      <span data-testid="score-value">Your score: {score}</span>
      <span data-testid="current-word">{currentWord}</span>
      <span>
        <Button
          label="Reset"
          onClick={() => reset()}
          data-testid="reset-button"
        />
      </span>
    </div>
  );
};

export { Score };
