import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/components';
import api from '@/lib/api';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegisterHandler = async (userData) => {
    setLoading(true);
    setErrorMessage('');
    try {
      await api.register(userData);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4'>
      <Card className='w-full max-w-md border-none shadow-xl ring-1 ring-slate-200'>
        <CardHeader className='space-y-1 pt-8 text-center'>
          <CardTitle className='text-2xl font-extrabold text-slate-900'>
            Buat Akun
          </CardTitle>
          <CardDescription>
            Bergabunglah dengan komunitas kami hari ini
          </CardDescription>
        </CardHeader>

        <CardContent className='pt-4'>
          {errorMessage && (
            <div className='mb-5 flex items-center gap-2 p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-lg border border-destructive/20'>
              <AlertCircle className='size-4 shrink-0' />
              <span>{errorMessage}</span>
            </div>
          )}

          <RegisterForm onRegister={onRegisterHandler} isLoading={loading} />
        </CardContent>

        <CardFooter className='pb-8 pt-2'>
          <p className='text-sm text-center w-full text-muted-foreground'>
            Sudah punya akun?{' '}
            <Link
              to='/'
              className='text-primary font-bold hover:underline underline-offset-4'
            >
              Masuk
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
