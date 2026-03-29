import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreadItem } from './ThreadItem';
import { asyncFetchThreadsAndUsers } from '../states/threadList/action';
import { Loader2, Zap, MessageSquareText, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ThreadList() {
  const dispatch = useDispatch();
  const { threads, users, loading, error } = useSelector(
    (state) => state.threadList,
  );

  useEffect(() => {
    dispatch(asyncFetchThreadsAndUsers());
  }, [dispatch]);

  if (loading && threads.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[50vh] gap-3'>
        <Loader2 className='h-9 w-9 animate-spin text-primary' />
        <p className='text-sm text-muted-foreground font-medium animate-pulse'>
          Menyiapkan diskusi terbaru...
        </p>
      </div>
    );
  }

  if (error && threads.length === 0) {
    return (
      <div className='container max-w-5xl mx-auto my-10 px-4'>
        <div className='p-6 border-2 border-dashed border-destructive/50 bg-destructive/10 text-destructive rounded-xl text-center flex flex-col items-center gap-3'>
          <Zap className='h-10 w-10 text-destructive opacity-80' />
          <h3 className='font-bold text-lg'>Ups! Terjadi Kesalahan</h3>
          <p className='text-sm max-w-md'>{error}</p>
          <Button
            variant='outline'
            size='sm'
            onClick={() => dispatch(asyncFetchThreadsAndUsers())}
          >
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='flex items-end justify-between gap-4 mb-8 pb-3 border-b border-border/70'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <h2 className='text-3xl font-extrabold tracking-tighter text-foreground sm:text-4xl'>
              Diskusi Terbaru
            </h2>
            {loading && threads.length > 0 && (
              <RefreshCw className='h-4 w-4 animate-spin text-muted-foreground' />
            )}
          </div>
          <p className='text-muted-foreground text-sm max-w-lg'>
            Temukan berbagai macam topik menarik dan bergabunglah dalam
            percakapan.
          </p>
        </div>
        <Badge
          variant='secondary'
          className='font-semibold text-xs py-1 px-3 rounded-full tabular-nums text-muted-foreground/90 whitespace-nowrap'
        >
          {threads.length} <span className='font-normal ml-1'>Threads</span>
        </Badge>
      </div>

      {error && threads.length > 0 && (
        <div className='mb-4 p-2 bg-destructive/10 text-destructive text-xs rounded-lg text-center'>
          Gagal memperbarui data terbaru. Menampilkan data tersimpan.
        </div>
      )}

      {threads.length > 0 ? (
        <div className='grid gap-6 md:gap-7'>
          {threads.map((thread) => {
            const user = users.find((u) => u.id === thread.ownerId);
            return user ? (
              <ThreadItem key={thread.id} thread={thread} user={user} />
            ) : null;
          })}
        </div>
      ) : (
        <div className='text-center py-24 border-2 border-dashed border-border/60 rounded-2xl bg-muted/20'>
          <MessageSquareText className='h-12 w-12 text-muted-foreground/60 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-foreground'>
            Papan Diskusi Kosong
          </h3>
          <p className='text-muted-foreground text-sm mt-1 max-w-xs mx-auto'>
            Belum ada diskusi yang dibuat. Jadilah yang pertama memulai
            percakapan!
          </p>
          <Button className='mt-6 rounded-full' size='sm'>
            Mulai Diskusi Baru
          </Button>
        </div>
      )}
    </>
  );
}
