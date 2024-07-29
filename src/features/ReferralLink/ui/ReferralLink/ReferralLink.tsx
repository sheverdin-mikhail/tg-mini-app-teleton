import clsx from 'clsx';
import cls from './ReferralLink.module.scss';
import { useGetReferralData } from '@/entities/Referral';
import { Button } from '@telegram-apps/telegram-ui';
import { ReferralLinkLoading } from '../ReferralLinkLoading/ReferralLinkLoading';
import { useCallback, useMemo } from 'react';
import { copyToClipboard } from '@/shared/lib/utils/clipboard';

interface ReferralLinkProps {
    className?: string;
}

export const ReferralLink: React.FC<ReferralLinkProps> = (props) => {
    const { className } = props;
    const {data: referralData, isLoading} = useGetReferralData()

    const referralLink = useMemo(() => `${import.meta.env.VITE_APP_URL}/?startapp=ref-${referralData?.code}`, [referralData])

    const onClickHandler = useCallback(() => {
        if(referralLink) {
            copyToClipboard(referralLink)
        }
    }, [referralLink]);

    if (isLoading) {
        return <ReferralLinkLoading />
    }

    return (
        <div className={clsx(cls.referralLink, {}, [className])}>
            <p className={cls.link}>{referralLink}</p>
            <Button onClick={onClickHandler} disabled={!referralData?.code}>Copy</Button>
        </div>
    );
}