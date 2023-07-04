import { MessageType } from '@/components/Message';
import { useEffect, useState } from 'react';

const useMessage = () => {
  const [message, setMessage] = useState<MessageType | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMessage(null), 1000);
    return () => clearTimeout(timer);
  }, [message]);

  return [message, setMessage] as const;
};

export { useMessage };
