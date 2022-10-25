import { Outlet, useLocation } from 'react-router-dom'
import { FriendsPage } from './FriendsPage';
import { FriendsPageStyle } from '../../utils/styles/friends';
import { FriendPageNavbar } from '../../components/navbar/FriendsPageNavbar';

export const FriendsLayoutPage = () => {
  const { pathname } = useLocation();
  return (
    <FriendsPageStyle>
      <FriendPageNavbar />
      {pathname === '/friends' && <FriendsPage />}
      <Outlet />
    </FriendsPageStyle>
  )
}