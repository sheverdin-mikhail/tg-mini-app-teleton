import { Navigate, useLocation } from 'react-router-dom';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/const/localStorage';

interface RequireAuthProps {
  children?: React.ReactNode;
}

const token = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();

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
