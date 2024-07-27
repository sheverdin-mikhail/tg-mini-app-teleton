import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@telegram-apps/telegram-ui';
import { AppRouteProps, routeConfig } from '@/shared/config/RouteConfig/appRouteConfig';
import { Header } from '@/widgets/Header';
import { BottomNavbar } from '@/widgets/BottomNavbar';
import { RequireAuth } from './RequireAuth';

export const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = (
      <Suspense fallback={<Spinner size="m" />}>
        {route.element}
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? (
          <RequireAuth>
            {
              route.authOnly
                ? (
                  <>
                    <Header />
                    <div className="page-wrapper">
                      {element}
                    </div>
                    <BottomNavbar />
                  </>
                )
                : <>{ element }</>
            }
          </RequireAuth>
        ) : element}
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>

  );
};
