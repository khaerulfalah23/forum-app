import PropTypes from 'prop-types';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export function Navbar({ logout }) {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <MessageSquarePlus className='size-6 text-primary' />
          <h1 className='text-xl font-bold tracking-tighter text-foreground'>
            Forum<span className='text-primary'>App</span>
          </h1>
        </Link>
        <div className='flex items-center gap-3'>
          <Button
            variant='destructive'
            size='sm'
            onClick={logout}
            className='rounded-full px-4 text-xs h-8'
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};
