import { useGame } from '@/providers';
import classNames from 'classnames';
import './Wordlist.scss';
import { Badge } from '@/components/Badge';

export type MessageType = {
  state: 'error' | 'success' | 'default';
  message: string;
};

const Wordlist = () => {
  const { guessedWords } = useGame();

  const classes = classNames('wordlist__list');

  const listItems = () => {
    const words = Object.keys(guessedWords);

    if (words.length === 0) return <li>No words guessed yet</li>;

    return Object.keys(guessedWords)
      .reverse()
      .map((word) => {
        const isValid = guessedWords[word];

        return (
          <li key={word} className="wordlist__item" data-testid="listitem">
            {word}
            <Badge
              variant={isValid ? 'success' : 'error'}
              label={isValid ? 'Correct' : 'Incorrect'}
            />
          </li>
        );
      });
  };

  return (
    <div className="wordlist" data-testid="wordlist">
      <ul className={classes} data-testid="list">
        {listItems()}
      </ul>
    </div>
  );
};

export { Wordlist };
