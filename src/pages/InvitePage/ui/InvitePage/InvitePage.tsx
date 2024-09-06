import clsx from 'clsx';
import { PageContentHeader } from '@/widgets/PageContentHeader';
import cls from './InvitePage.module.scss';
import { ReferralLink } from '@/features/ReferralLink';
import { FriendsList } from '@/features/FriendsList';
import InvitePageImage from '@/shared/assets/img/chains.png'
import { Container } from '@/shared/ui/Container/Container';


interface InvitePageProps {
  className?: string;
}

export const InvitePage: React.FC<InvitePageProps> = (props) => {
  const { className } = props;
  
  return (
    <div className={clsx(cls.invitePage, {}, [className])}>
      <PageContentHeader title="Invite new streamers" description="Get additional streams and views together" img={InvitePageImage} />
      <Container>
        <FriendsList />
      </Container>
      <ReferralLink />
    </div>
  );
};
