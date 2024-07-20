import clsx from 'clsx';
import { PageContentHeader } from 'widgets/PageContentHeader';
import cls from './InvitePage.module.scss';

interface InvitePageProps {
    className?: string;
}

export const InvitePage: React.FC<InvitePageProps> = (props) => {
  const { className } = props;

  return (
    <div className={clsx(cls.invitePage, {}, [className])}>
      <PageContentHeader title="Invite new streamers" description="Earn more points" />
    </div>
  );
};
