import clsx from 'clsx';
import cls from './ReferralLink.module.scss';
import { useGetReferralData } from '@/entities/Referral';
import { Snackbar } from '@telegram-apps/telegram-ui';
import { ReferralLinkLoading } from '../ReferralLinkLoading/ReferralLinkLoading';
import { useCallback, useMemo, useState } from 'react';
import { initUtils } from '@telegram-apps/sdk';
import { copyToClipboard } from '@/shared/lib/utils/clipboard';
import { Button } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import ShareIcon from '@/shared/assets/icons/share-icon.svg';


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
            utils.shareURL(referralLink, 'Play with me and become a popular streamer 🎮')
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
                <Icon 
                    Svg={ShareIcon} 
                    width={24}
                    height={24}
                    className={cls.shareIcon}
                />Share
            </Button>
            <button
                className={cls.copy}
                onClick={onClickCopyHandler} 
                disabled={!referralData?.code || snakbarIsOpen}
            >
                <Icon
                    Svg={CopyIcon}
                    width={24}
                    height={24}
                    className={cls.copyIcon}
                />
            </button>
            {
                snakbarIsOpen && <Snackbar  onClose={() => setSnakBarIsOpen(false)} duration={1500}>
                                    The link has been successfully copied
                                </Snackbar>
            }
        </div>
    );
}