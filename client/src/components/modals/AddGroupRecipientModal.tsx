import { createRef, Dispatch, FC, SetStateAction, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { ModalContainer, ModalContentBody, ModalHeader } from '.';
import { OverlayStyle } from '../../utils/styles';
import { GroupRecipientAddForm } from '../forms/GroupRecipientAddForm';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const AddGroupRecipientModal: FC<Props> = ({
  showModal,
  setShowModal,
}) => {
  const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      e.key === 'Escape' && setShowModal(false);
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { current } = ref;
    if (current === e.target) {
      console.log('close modal');
      setShowModal(false);
    }
  }
  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer showModal={showModal}>
        <ModalHeader>
          <h2>Add Recipient</h2>
          <MdClose
            cursor="pointer"
            size={32}
            onClick={() => setShowModal(false)}
          />
        </ModalHeader>
        <ModalContentBody>
          <GroupRecipientAddForm />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  )
}