interface RoleProviderProps {
  children?: React.ReactNode;
  // sawatzkyOnly: boolean;
  // permittedRoles?: EmployeeRole[];
}

export const RoleProvider = (props: RoleProviderProps) => {
  const { children } = props;
  // const { isSawatzky, role } = useUserData();

  // if (permittedRoles?.length ? (role && !permittedRoles?.includes(role)) : null) {
  //   return (
  //     <Navigate
  //       to="/forbidden"
  //       replace // <-- redirect
  //       state={{ path: location.pathname }}
  //     />
  //   );
  // }

  // if ((sawatzkyOnly && !isSawatzky)) {
  //   return (
  //     <Navigate
  //       to="/forbidden"
  //       replace // <-- redirect
  //       state={{ path: location.pathname }}
  //     />
  //   );
  // }

  return <>{children}</>;
};
