import { FC, useContext } from 'react';
import { IoMdCall, IoMdVideocam } from 'react-icons/io';
import { AuthContext } from '../../utils/context/AuthContext';
import { getUserFriendInstance } from '../../utils/helpers';
import { CallSidebarItemContainer } from '../../utils/styles';
import { Friend } from '../../utils/types';
import { UserAvatar } from '../users/UserAvatar';

type Props = {
  friend: Friend;
};

export const CallSidebarItem: FC<Props> = ({ friend }) => {
  const iconSize = 32;
  const { user } = useContext(AuthContext);
  return (
    <CallSidebarItemContainer>
      <div>
        <UserAvatar user={getUserFriendInstance(user!, friend)} />
      </div>
      <div>
        <div>
          <span className="username">{user?.username}</span>
        </div>
        <div className="icons">
          <div className="icon">
            <IoMdVideocam size={iconSize} />
          </div>
          <div className="icon">
            <IoMdCall size={iconSize} />
          </div>
        </div>
      </div>
    </CallSidebarItemContainer>
  )
}