import { ArrowCycle, ChatDots, Person } from 'akar-icons';
import { UserAvatar, UserSidebarItemStyle, UserSidebarStyle } from '../../utils/styles';
import styles from './index.module.scss';
import avatar from '../../__assets__/avatar_1.png';
import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserSidebarItemType, UserSidebarRouteType } from '../../utils/types';
import { userSidebarItems } from '../../utils/constants';

export const getIcon = (id: UserSidebarRouteType) => {
  switch (id) {
    case 'conversations':
      return ChatDots;
    case 'friends':
      return Person;
    case 'connections':
      return ArrowCycle;
    default:
      return ChatDots;
  }
};

type Props = {
  item: UserSidebarItemType;
};

export const UserSidebarItem: FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const Icon = getIcon(item.id);
  const ICON_SIZE = 30;
  const STROKE_WIDTH = 2;

  const isActive = () => {
    if (pathname.includes('/groups') && item.id === 'conversations')
      return true;
    return pathname.includes(item.pathname);
  }

  return (
    <UserSidebarItemStyle
      onClick={() => navigate(item.pathname)}
      active={isActive()}
    >
      <Icon size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
    </UserSidebarItemStyle>
  );
}

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <UserSidebarStyle>
        <UserAvatar src={avatar} alt="avatar" width="55px" />
        <hr className={styles.hr} />
        {userSidebarItems.map((item) => (
          <UserSidebarItem item={item} />
        ))}
      </UserSidebarStyle>
    </>
  );
};