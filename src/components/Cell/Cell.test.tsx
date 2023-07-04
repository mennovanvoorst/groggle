import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { GameContext, initialGameContext } from '@/providers';
import { Cell } from './Cell';
import React from 'react';

const cellProps = {
  x: 0,
  y: 0,
  letter: '',
  selected: false,
};

const cellData = { ...cellProps, ref: null };

describe('Cell', () => {
  it('Renders component', async () => {
    render(<Cell {...cellProps} />);

    const cell = await screen.findByTestId('cell');
    expect(cell).toBeTruthy();
  });

  it('Should call cellClicked when clicked', async () => {
    const user = userEvent.setup();
    const cellClicked = jest.fn();

    render(
      <GameContext.Provider value={{ ...initialGameContext, cellClicked }}>
        <Cell {...cellProps} />
      </GameContext.Provider>,
    );

    const cell = await screen.findByTestId('cell');
    await user.click(cell);

    expect(cellClicked).toBeCalledWith(cellData);
  });

  it('Should call cellClicked when clicked and moved', async () => {
    const user = userEvent.setup();
    const cellEntered = jest.fn();

    render(
      <GameContext.Provider value={{ ...initialGameContext, cellEntered }}>
        <Cell {...cellProps} />
      </GameContext.Provider>,
    );

    const cell = await screen.findByTestId('cell');
    fireEvent.mouseMove(cell, cellData);

    expect(cellEntered).toBeCalledWith(cellData);
  });

  it.each([[true], [false]])(
    'Should add or remove class when selected is %p',
    async (selected) => {
      render(<Cell {...cellProps} selected={selected} />);

      const cell = await screen.findByTestId('cell');

      if (selected) {
        expect(cell.className).toContain('cell--selected');
      } else {
        expect(cell.className).not.toContain('cell--selected');
      }
    },
  );

  it('Should render line if selected and there is a next element', async () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { focus } });

    const selectedCells = [
      { ...cellData, ref: document.createElement('div'), selected: true },
      {
        ...cellData,
        ref: document.createElement('div'),
        x: 1,
        y: 1,
        selected: true,
      },
    ];

    render(
      <GameContext.Provider value={{ ...initialGameContext, selectedCells }}>
        <Cell {...cellProps} selected={true} />
      </GameContext.Provider>,
    );

    const line = await screen.findByTestId('line');
    expect(line).toBeTruthy();
  });
});
