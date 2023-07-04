import './Line.scss';

type LineProps = {
  ang: number;
  top: number;
  left: number;
  height: number;
};

const Line = ({ top, left, height, ang }: LineProps) => (
  <div
    data-testid="line"
    className="line"
    style={{
      top: `${top}px`,
      left: `${left}px`,
      height: `${height}px`,
      transform: `rotate(${ang}deg)`,
    }}
  />
);

export { Line };
