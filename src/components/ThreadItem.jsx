import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { postedAt } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquareText } from 'lucide-react';

const getAvatarColor = (name) => {
  const colors = [
    'bg-sky-600 text-sky-50',
    'bg-emerald-600 text-emerald-50',
    'bg-amber-500 text-amber-950',
    'bg-rose-600 text-rose-50',
    'bg-violet-600 text-violet-50',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export function ThreadItem({ thread, user }) {
  const { id, title, body, category, createdAt, totalComments } = thread;
  const { name, avatar } = user;
  const avatarInitials = name.substring(0, 2).toUpperCase();

  return (
    <Card className='overflow-hidden border border-border/60 shadow-sm transition-all hover:border-primary/40 hover:shadow-md'>
      <CardHeader className='flex flex-row items-center gap-3 space-y-0 p-5 pb-4'>
        <Avatar
          className={`h-10 w-10 border border-border/50 ${getAvatarColor(name)}`}
        >
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className='font-semibold text-xs tracking-wider'>
            {avatarInitials}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-0.5'>
          <span className='text-sm font-semibold leading-none text-foreground'>
            {name}
          </span>
          <span className='text-xs text-muted-foreground'>
            {postedAt(createdAt)}
          </span>
        </div>
      </CardHeader>

      <CardContent className='px-5 pb-5 pt-0 flex flex-col gap-3'>
        <h3 className='text-xl font-bold leading-snug tracking-tight'>
          <Link
            to={`/threads/${id}`}
            className='text-foreground hover:text-primary transition-colors duration-150'
          >
            {title}
          </Link>
        </h3>

        <div
          className='text-[0.925rem] leading-relaxed text-muted-foreground/90 line-clamp-3 prose prose-sm dark:prose-invert max-w-none'
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </CardContent>

      <CardFooter className='flex items-center justify-between gap-4 p-4 px-5 border-t border-border/60 bg-muted/40'>
        <Badge
          variant='outline'
          className='rounded-full font-medium text-xs px-3 py-0.5 bg-background shadow-inner'
        >
          <span className='text-muted-foreground mr-1'>#</span>
          {category}
        </Badge>

        <div className='flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors'>
          <MessageSquareText className='size-4 opacity-80' />
          <span className='text-xs font-semibold tabular-nums'>
            {totalComments}{' '}
            <span className='font-normal opacity-80'>Komentar</span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};
