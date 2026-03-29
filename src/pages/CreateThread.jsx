import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { asyncCreateThread } from '../states/thread/action';
import { Loader2, PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldTitle,
} from '@/components/ui/field';

const formSchema = z.object({
  title: z
    .string()
    .min(1, 'Judul wajib diisi')
    .max(100, 'Judul terlalu panjang'),
  body: z.string().min(10, 'Isi thread minimal 10 karakter'),
  category: z.string().optional(),
});

export function CreateThread() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, thread } = useSelector((state) => state.thread);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      category: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(asyncCreateThread(values));
      reset();
      navigate('/');
    } catch {
      alert(error);
    }
  };

  return (
    <section className='container max-w-2xl mx-auto py-10 px-4'>
      <Card className='shadow-lg border-border/60'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center gap-2 text-primary'>
            <PlusCircle className='size-5' />
            <CardTitle className='text-2xl font-bold tracking-tight'>
              Buat Diskusi Baru
            </CardTitle>
          </div>
          <CardDescription>
            Bagikan pertanyaan atau informasi menarik dengan komunitas.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <Field data-invalid={!!errors.title}>
              <FieldLabel>
                <FieldTitle>Judul Diskusi</FieldTitle>
              </FieldLabel>
              <Input
                {...register('title')}
                placeholder='Apa yang ingin kamu bahas?'
                className={errors.title ? 'border-destructive' : ''}
              />
              <FieldError errors={errors.title ? [errors.title] : []} />
            </Field>

            <Field>
              <FieldLabel>
                <FieldTitle>Kategori</FieldTitle>
              </FieldLabel>
              <Input
                {...register('category')}
                placeholder='contoh: react, tips'
              />
              <FieldDescription>
                Opsional, gunakan kata kunci yang relevan.
              </FieldDescription>
            </Field>

            <Field data-invalid={!!errors.body}>
              <FieldLabel>
                <FieldTitle>Isi Diskusi</FieldTitle>
              </FieldLabel>
              <Textarea
                {...register('body')}
                placeholder='Tuliskan detail pembahasanmu...'
                className={`min-h-37.5 resize-none ${errors.body ? 'border-destructive' : ''}`}
              />
              <FieldError errors={errors.body ? [errors.body] : []} />
            </Field>

            {error && (
              <div className='flex items-center gap-2 p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20'>
                <AlertCircle className='size-4' />
                {error}
              </div>
            )}

            {thread && !error && (
              <div className='flex items-center gap-2 p-3 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-md border border-emerald-200'>
                <CheckCircle2 className='size-4' />
                Thread berhasil dibuat!
              </div>
            )}

            <Button
              type='submit'
              className='w-full font-semibold'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Mengirim...
                </>
              ) : (
                'Terbitkan Thread'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
