import React, { useState } from 'react';
import { MessageTextarea } from '../../utils/styles/inputs/Textarea';

export const MessageTextField = () => {
  const [message, setMessage] = useState('');
  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  return (
    <MessageTextarea
      value={message}
      onChange={onMessageChange}
    ></MessageTextarea>
  )
}