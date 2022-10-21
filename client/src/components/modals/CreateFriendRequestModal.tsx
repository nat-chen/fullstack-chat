import React, { createRef, Dispatch, FC, SetStateAction, useEffect } from 'react'
import { MdClose } from 'react-icons/md';
import { ModalContainer, ModalContentBody, ModalHeader } from '.';
import { OverlayStyle } from '../../utils/styles';
import { SendFriendRequestForm } from '../forms/SendFriendRequestForm';

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const CreateFriendRequestModal: FC<Props> = ({ setShowModal }) => {
  const ref = createRef<HTMLDivElement>();
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { current } = ref;
    if (current === e.target) {
      console.log('close modal');
      setShowModal(false);
    }
  };
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowModal(false);
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <h2>Send a Friend Request</h2>
          <MdClose size={32} onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalContentBody>
          <SendFriendRequestForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  )
}