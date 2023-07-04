import { useGame } from '@/providers';
import classNames from 'classnames';
import './Cell.scss';
import React from 'react';
import { calculateLineDirection, getNextInArray } from '@/utils';
import { Line } from '../Line';

export type CellProps = Omit<CellData, 'ref'>;

export type CellData = {
  x: number;
  y: number;
  letter: string;
  selected: boolean;
  ref: HTMLDivElement | null;
};

const Cell = ({ letter, x, y, selected }: CellProps) => {
  const { cellClicked, cellEntered, selectedCells } = useGame();
  const ref = React.useRef<HTMLDivElement>(null);

  const data = { x, y, letter, selected, ref: ref.current };

  const handleMouseDown = () => cellClicked(data);
  const handleMouseMove = () => cellEntered(data);

  const renderLine = () => {
    const index = selectedCells.findIndex(
      (cell) => cell.x === x && cell.y === y,
    );

    const nextElement = getNextInArray(selectedCells, index);

    if (selected && nextElement) {
      if (ref.current && nextElement.ref) {
        const line = calculateLineDirection(nextElement.ref, ref.current);
        return <Line {...line} />;
      }
    }

    return <></>;
  };

  const classes = classNames('cell', {
    'cell--selected': selected,
  });

  return (
    <>
      <div
        data-testid="cell"
        ref={ref}
        className={classes}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
      >
        {letter}
      </div>
      {renderLine()}
    </>
  );
};

export { Cell };
