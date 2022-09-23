import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/hooks/useAuth';

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { loading, user } = useAuth();
  console.log('loading')
  if (loading) {
    return <div>loading</div>
  }
  if (user) return <>{children}</>;
  return <Navigate to="/login" state={{ from: location }} replace />
}