import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CreateThreadButton() {
  return (
    <Link
      to='/create'
      className='fixed bottom-5 right-5 bg-primary p-2 rounded-full hover:bg-primary/90 active:bg-primary/80 shadow-lg z-50'
    >
      <Plus size={32} className='text-white' />
    </Link>
  );
}
