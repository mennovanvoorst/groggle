import { useEffect, useRef, useState } from 'react';
import { Cell, CellData } from '../Cell';
import './Board.scss';
import { BOARD_SIZE } from '@/constants';
import { useGame } from '@/providers';
import { Message } from '../Message';

const Board = () => {
  const { board, selectedCells, message, reset } = useGame();

  useEffect(() => {
    reset();
  }, []);

  const cells = [...Array(BOARD_SIZE * BOARD_SIZE)].map((_, index) => {
    if (board.length === 0) return;

    const x = index % BOARD_SIZE;
    const y = Math.floor(index / BOARD_SIZE);
    const letter = board[x][y];

    return (
      <Cell
        key={`cell_${x}_${y}`}
        x={x}
        y={y}
        letter={letter}
        selected={
          selectedCells.filter((cell) => cell.x === x && cell.y === y).length >
          0
        }
      />
    );
  });

  return (
    <div className="board relative" data-testid="board">
      <div className="board__grid">{cells}</div>

      {message && <Message {...message} />}
    </div>
  );
};

export { Board };
