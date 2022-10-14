import { CircleX } from 'akar-icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { SelectedRecipientPillStyle } from '../../utils/styles';
import { ConversationType, User } from '../../utils/types';

type Props = {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
}

export const SelectedRecipientChip: FC<Props> = ({ user, setSelectedUser }) => {
  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user.email}</span>
        <CircleX
          className="icon"
          size={20}
          onClick={() => {
            setSelectedUser(undefined);
          }}
        />
      </div>
    </SelectedRecipientPillStyle>
  );
}