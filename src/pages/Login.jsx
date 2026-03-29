import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import { LoginForm } from '@/components';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onLoginHandler = async (credentials) => {
    setLoading(true);
    try {
      await dispatch(asyncSetAuthUser(credentials));
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4'>
      <Card className='w-full max-w-md border-none shadow-2xl ring-1 ring-slate-200'>
        <CardHeader className='space-y-2 pt-8 text-center'>
          <CardTitle className='text-2xl font-extrabold text-slate-900 leading-tight'>
            See <span className='text-primary italic'>The World</span>, <br />
            Discussion Forum App.
          </CardTitle>
          <CardDescription>
            Silakan masuk untuk berdiskusi dengan komunitas.
          </CardDescription>
        </CardHeader>

        <CardContent className='pt-4'>
          <LoginForm onLogin={onLoginHandler} isLoading={loading} />
        </CardContent>

        <CardFooter className='pb-8 pt-2'>
          <p className='text-sm text-center w-full text-muted-foreground'>
            Belum punya akun?{' '}
            <Link
              to='/register'
              className='text-primary font-bold hover:underline underline-offset-4 transition-all'
            >
              Daftar di sini
            </Link>
          </p>
        </CardFooter>
      </Card>

      <footer className='mt-12 text-center space-y-2'>
        <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400'>
          Powered by Khaerul Falah
        </p>
      </footer>
    </div>
  );
}
