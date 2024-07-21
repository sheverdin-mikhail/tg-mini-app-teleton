import './styles/index.scss';
import { WelcomeModal } from 'widgets/WelcomeModal';
import { PageLoader } from 'widgets/PageLoader';

import { useInitApp } from 'shared/lib/hooks/useInitApp/useInitApp';
import { AppRouter } from './router';

const App = () => {
  const { isInit, welcomeModalIsOpen, setWelcomeModalIsOpen } = useInitApp();
  return (
    <>
      {
        isInit
          ? (
            <>
              <AppRouter />
              <WelcomeModal isOpen={welcomeModalIsOpen ?? false} setIsOpen={setWelcomeModalIsOpen} />
            </>
          )
          : <PageLoader />
      }
    </>
  );
};

export default App;
