import React, { Dispatch, FC, SetStateAction } from 'react';
import { MessageInput, MessageInputContainer } from '../../utils/styles';
import { MessageTextField } from '../inputs/MessageTextField';
import styles from './index.module.scss';

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  placeholderName: string;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  sendTypingStatus: () => void;
}

export const MessageInputField:FC<Props> = ({
  content,
  placeholderName,
  setContent,
  sendMessage,
  sendTypingStatus,
}) => {
  const updateContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  return (
    <>
      <MessageInputContainer>
        <form onSubmit={sendMessage} className={styles.form}>
          <MessageTextField />
        </form>
      </MessageInputContainer>
    </>
  )
}