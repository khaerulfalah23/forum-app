import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSelector } from 'react-redux';
import { Loader2, SendHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldTitle,
} from '@/components/ui/field';

const commentSchema = z.object({
  content: z.string().min(1, 'Komentar tidak boleh kosong'),
});

export function CommentInput({ onAddComment }) {
  const { loading } = useSelector((state) => state.comment);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = (values) => {
    onAddComment(values.content);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Field data-invalid={!!errors.content}>
        <FieldLabel className='sr-only'>
          <FieldTitle>Isi Komentar</FieldTitle>
        </FieldLabel>

        <div className='relative group'>
          <Textarea
            {...register('content')}
            placeholder='Tuliskan pemikiranmu di sini...'
            className={`min-h-25 pr-12 resize-none bg-white focus-visible:ring-primary/30 transition-all ${
              errors.content
                ? 'border-destructive focus-visible:ring-destructive/20'
                : 'border-slate-200'
            }`}
          />

          <div className='absolute bottom-3 right-3'>
            <Button
              type='submit'
              size='icon'
              disabled={loading}
              className='h-8 w-8 rounded-full shadow-sm transition-transform active:scale-90'
            >
              {loading ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <SendHorizontal className='h-4 w-4' />
              )}
            </Button>
          </div>
        </div>

        <FieldError errors={errors.content ? [errors.content] : []} />
      </Field>

      <p className='text-[11px] text-muted-foreground px-1'>
        Tekan tombol kirim untuk mempublikasikan komentar Anda.
      </p>
    </form>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};
