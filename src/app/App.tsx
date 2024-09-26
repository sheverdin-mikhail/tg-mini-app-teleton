import { WellcomeToTeletonPage } from '@/pages/WellcomeToTeletonPage';
import './styles/index.scss';
// import { WelcomeModal } from '@/widgets/WelcomeModal';
// import { PageLoader } from '@/widgets/PageLoader';

// import { useInitApp } from '@/shared/lib/hooks/useInitApp/useInitApp';
// import { AppRouter } from './router';
// import { EarnOfflinePointsModal } from '@/features/EarnOfflinePoints';
// import { QrCodeModal } from '@/features/QrCodeModal/QrCodeModal';

const App = () => {
  // const { isInit, welcomeModalIsOpen, setWelcomeModalIsOpen } = useInitApp();

  return <WellcomeToTeletonPage />

//   return (
//     // <>
//       {/* {
//         isInit
//           ? (
//             <>
//               <AppRouter />
//               <WelcomeModal isOpen={welcomeModalIsOpen} setIsOpen={setWelcomeModalIsOpen} />
//               <EarnOfflinePointsModal />
//               <QrCodeModal />
//             </>
//           )
//           : <PageLoader />
//       } */}


//     {/* </> */}

//   );
};

export default App;
