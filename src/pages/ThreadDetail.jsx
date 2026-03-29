import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CommentInput } from '../components';
import { postedAt } from '@/lib/utils';
import { asyncFetchThreadDetail } from '../states/threadDetail/action';
import { asyncAddComment } from '../states/comment/action';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, MessageSquare, Calendar, Hash, User2 } from 'lucide-react';

export function ThreadDetail() {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const { thread, loading, error } = useSelector((state) => state.threadDetail);
  const comments = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(asyncFetchThreadDetail(threadId));
  }, [dispatch, threadId]);

  const handleAddComment = (content) => {
    dispatch(asyncAddComment(threadId, content));
  };

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] gap-3'>
        <Loader2 className='h-10 w-10 animate-spin text-primary' />
        <p className='text-sm text-muted-foreground font-medium'>
          Memuat diskusi...
        </p>
      </div>
    );
  }

  if (error || !thread) {
    return (
      <div className='bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg text-center'>
        {error || 'Data tidak ditemukan'}
      </div>
    );
  }

  return (
    <div className='bg-slate-50/50 min-h-screen'>
      <Card className='border-none shadow-sm ring-1 ring-slate-200 overflow-hidden'>
        <CardHeader className='bg-white p-6 sm:p-8 pb-4 space-y-6'>
          <div className='flex items-center justify-between'>
            <Badge
              variant='outline'
              className='bg-slate-50 text-slate-600 border-slate-200 px-3 py-1 rounded-md'
            >
              <Hash className='size-3 mr-1' />
              {thread.category}
            </Badge>
            <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
              <Calendar className='size-3.5' />
              {postedAt(thread.createdAt)}
            </div>
          </div>

          <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]'>
            {thread.title}
          </h1>

          <div className='flex items-center gap-3 pt-2'>
            <Avatar className='h-10 w-10 ring-2 ring-white shadow-sm'>
              <AvatarImage src={thread.owner.avatar} alt={thread.owner.name} />
              <AvatarFallback className='bg-primary/10 text-primary'>
                <User2 className='size-5' />
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span className='text-sm font-bold text-slate-800'>
                {thread.owner.name}
              </span>
              <span className='text-[11px] text-muted-foreground uppercase tracking-wider font-medium'>
                Author
              </span>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className='bg-white p-6 sm:p-8 pt-8'>
          <div
            className='text-slate-700 text-lg leading-relaxed space-y-4 wrap-break-word'
            dangerouslySetInnerHTML={{ __html: thread.body }}
          />
        </CardContent>
      </Card>

      <div className='space-y-6 pt-4'>
        <div className='flex items-center gap-3 px-1'>
          <div className='bg-primary/10 p-2 rounded-lg'>
            <MessageSquare className='size-5 text-primary' />
          </div>
          <h2 className='text-xl font-bold text-slate-800'>
            Komentar{' '}
            <span className='text-slate-400 font-normal ml-1'>
              ({comments.length})
            </span>
          </h2>
        </div>

        <div className='space-y-4'>
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className='border-none shadow-none bg-white ring-1 ring-slate-200'
            >
              <CardContent className='p-5 flex gap-4'>
                <Avatar className='h-9 w-9 border-none shrink-0'>
                  <AvatarImage
                    src={comment.owner.avatar}
                    alt={comment.owner.name}
                  />
                  <AvatarFallback className='bg-slate-100 text-slate-500 text-xs'>
                    {comment.owner.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-2 w-full'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-bold text-slate-800'>
                      {comment.owner.name}
                    </span>
                    <span className='text-[10px] text-muted-foreground font-medium uppercase'>
                      {postedAt(comment.createdAt)}
                    </span>
                  </div>
                  <div
                    className='text-sm text-slate-600 leading-relaxed'
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='pt-4'>
          <Card className='border-2 border-dashed border-slate-200 bg-slate-50/50 shadow-none'>
            <CardHeader className='p-5 pb-0'>
              <h3 className='text-sm font-bold text-slate-700 flex items-center gap-2'>
                Tulis Komentar Anda
              </h3>
            </CardHeader>
            <CardContent className='p-5'>
              <CommentInput
                threadId={threadId}
                onAddComment={handleAddComment}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
