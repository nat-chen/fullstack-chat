import { ChatAdd, Person, SignOut } from 'akar-icons';
import { UserAvatar, UserSidebarBottom, UserSidebarStyle, UserSidebarTop, UserSidebarTopIcons } from '../../utils/styles';
import styles from './index.module.scss';
import avatar from '../../__assets__/avatar_1.png';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { useState } from 'react';

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserSidebarTop>
          <UserAvatar src={avatar} width="55px" />
          <hr className={styles.hr} />
          <UserSidebarTopIcons>
            <ChatAdd size={38} onClick={() => setShowModal(true)} />
            <Person size={38} />
          </UserSidebarTopIcons>
        </UserSidebarTop>
        <UserSidebarBottom>
          <SignOut size={38} />
        </UserSidebarBottom>
      </UserSidebarStyle>
    </>
  );
};