import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { Register, Login, Home, CreateThread, ThreadDetail } from './pages';
import { LoadingBar } from '@dimasmds/react-redux-loading-bar';
import { Navbar } from './components/common/Navbar';
import { Loader2 } from 'lucide-react';

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-background gap-4'>
        <LoadingBar className='fixed top-0 z-9999 h-1 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]' />

        <Loader2 className='h-10 w-10 animate-spin text-primary' />
        <p className='text-sm font-medium text-muted-foreground animate-pulse'>
          Menyiapkan Forum...
        </p>
      </div>
    );
  }

  return (
    <>
      <LoadingBar
        className='fixed top-0 z-9999 h-1 bg-primary shadow-[0_0_8px_#3b82f6]'
        updateTime={100}
        maxProgress={95}
      />

      <div className='min-h-screen bg-background'>
        {authUser && <Navbar logout={onLogout} />}

        <main className='container max-w-5xl mx-auto py-10 px-4'>
          <Routes>
            {!authUser ? (
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/*' element={<Navigate to='/login' />} />
              </>
            ) : (
              <>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreateThread />} />
                <Route path='/threads/:threadId' element={<ThreadDetail />} />
                <Route path='/*' element={<Navigate to='/' />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
