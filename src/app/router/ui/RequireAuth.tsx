import { Navigate, useLocation } from 'react-router-dom';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';

interface RequireAuthProps {
  children?: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const { token } = useUserData();

  if (!token) {
    return (
      <Navigate
        to="/loading"
        replace // <-- redirect
        state={{ path: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};
