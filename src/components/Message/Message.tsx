import classNames from 'classnames';
import './Message.scss';

export type MessageType = {
  state: 'error' | 'success' | 'default';
  message: string;
};

const Message = ({ message, state }: MessageType) => {
  const classes = classNames('message__content', {
    'message--error': state === 'error',
    'message--success': state === 'success',
  });

  return (
    <div className="message rise-shake" data-testid="message">
      <h1 className={classes}>{message}</h1>
    </div>
  );
};

export { Message };
