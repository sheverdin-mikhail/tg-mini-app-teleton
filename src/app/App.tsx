import './styles/index.scss';

import { BottomNavbar } from 'widgets/BottomNavbar';
import { useEffect, useState } from 'react';
import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';
import { getUserIsNew } from 'entities/User';
import { useSelector } from 'react-redux';
import { WelcomeModal } from 'widgets/WelcomeModal';
import { Header } from 'widgets/Header';
import { AppRouter } from './router';

const App = () => {
  const { tg } = useTelegram();
  const userIsNew = useSelector(getUserIsNew);
  // const [welcomeModalIsOpen, setWelcomModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    tg.ready();
  }, []);

  // useEffect(() => {
  //   if (userIsNew) {
  //     setWelcomModalIsOpen(false);
  //   }
  // }, [userIsNew]);

  return (
    <>
      <AppRouter />
      {/* <WelcomeModal isOpen={welcomeModalIsOpen ?? false} /> */}
    </>
  );
};

export default App;
