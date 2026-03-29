import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LogIn, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldTitle,
  FieldError,
} from '@/components/ui/field';

const loginSchema = z.object({
  email: z.string().nonempty('Email wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi'),
});

export function LoginForm({ onLogin, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <form onSubmit={handleSubmit(onLogin)} className='space-y-5'>
      <Field data-invalid={!!errors.email}>
        <FieldLabel>
          <FieldTitle>Email</FieldTitle>
        </FieldLabel>
        <Input
          {...register('email')}
          type='email'
          placeholder='nama@contoh.com'
          className={
            errors.email
              ? 'border-destructive focus-visible:ring-destructive/20'
              : ''
          }
        />
        <FieldError errors={errors.email ? [errors.email] : []} />
      </Field>

      <Field data-invalid={!!errors.password}>
        <FieldLabel>
          <FieldTitle>Password</FieldTitle>
        </FieldLabel>
        <Input
          {...register('password')}
          type='password'
          placeholder='••••••••'
          className={
            errors.password
              ? 'border-destructive focus-visible:ring-destructive/20'
              : ''
          }
        />
        <FieldError errors={errors.password ? [errors.password] : []} />
      </Field>

      <Button
        type='submit'
        className='w-full h-11 font-bold shadow-md shadow-primary/20 mt-2'
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Masuk...
          </>
        ) : (
          <>
            <LogIn className='mr-2 size-4' />
            Masuk Sekarang
          </>
        )}
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
