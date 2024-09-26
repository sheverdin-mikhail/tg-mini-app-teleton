import clsx from 'clsx';
import { Button } from '@/shared/ui/Button/Button';
import WellComeImage from '@/shared/assets/img/wellcome-teleton.jpg'
import cls from './WellcomeToTeletonPage.module.scss';
import { initUtils } from '@telegram-apps/sdk';

interface WellcomeToTeletonPageProps {
    className?: string;
}

export const WellcomeToTeletonPage: React.FC<WellcomeToTeletonPageProps> = (props) => {
    const { className } = props;
    const utils = initUtils()

    const buttonClickHandler = () => () => {
          utils.openLink("https://t.me/TeletonOfficialAppBot/WATCH?startapp=teletonappsupport")
      };

    return (
        <div className={clsx(cls.wellcomeToTeletonPage, {}, [className])}>
            <img src={WellComeImage} className={cls.img} />
            <h1 className={cls.title}>Welcome to Teleton</h1>
            <p className={cls.description}>
                Earning Views at Teleton Tap is no longer available. Views will be converted to Teleton Points 1 to 1 and appear on your balance in the Teleton App.
                <br/> <br/>
                You need to log into the Teleton App to get Teleton Points. Teleton Points will be charged up to and including October 16.
            </p>
            <Button 
                className={cls.button}
                onClick={buttonClickHandler}
            >Launch Teleton App</Button>
        </div>
    );
}