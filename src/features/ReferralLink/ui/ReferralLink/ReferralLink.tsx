import clsx from 'clsx';
import cls from './ReferralLink.module.scss';
import { useGetReferralData } from '@/entities/Referral';
import { Button, Snackbar } from '@telegram-apps/telegram-ui';
import { ReferralLinkLoading } from '../ReferralLinkLoading/ReferralLinkLoading';
import { useCallback, useMemo, useState } from 'react';
import { initUtils } from '@telegram-apps/sdk';
import { AwesomeIcon } from '@/shared/ui/AwesomeIcon/AwesomeIcon';
import { copyToClipboard } from '@/shared/lib/utils/clipboard';

interface ReferralLinkProps {
    className?: string;
}

export const ReferralLink: React.FC<ReferralLinkProps> = (props) => {
    const { className } = props;
    const {data: referralData, isLoading} = useGetReferralData()
    const utils = initUtils()
    const [snakbarIsOpen, setSnakBarIsOpen] = useState(false)

    const referralLink = useMemo(() => `${import.meta.env.VITE_APP_URL}/?startapp=ref-${referralData?.code}`, [referralData])

    const onClickSharekHandler = useCallback(() => {
        if(referralLink) {
            utils.shareURL(referralLink, 'Играй со мной и стань популярным стримером 🎮')
        }
    }, [referralLink]);

    const onClickCopyHandler = () => {
        if(referralLink) {
            copyToClipboard(referralLink)
            setSnakBarIsOpen(true)
        }
    }

    if (isLoading) {
        return <ReferralLinkLoading className={cls.referralLink} />
    }

    return (
        <div className={clsx(cls.referralLink, {}, [className])}>
            <Button 
                onClick={onClickSharekHandler} 
                disabled={!referralData?.code}
                className={cls.button}
            >
                Share <AwesomeIcon icon='fa-solid fa-share' className={cls.shareIcon} />
            </Button>
            <Button 
                onClick={onClickCopyHandler} 
                disabled={!referralData?.code || snakbarIsOpen}
            >
                <AwesomeIcon icon='fa-solid fa-copy' className={cls.copyIcon} />
            </Button>
            {
                snakbarIsOpen && <Snackbar  onClose={() => setSnakBarIsOpen(false)} duration={1500}>
                                    The link has been successfully copied
                                </Snackbar>
            }
        </div>
    );
}