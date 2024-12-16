'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const path: string = usePathname();

  return (
    <nav className='p-5'>
      <ul className='flex flex-row gap-4 justify-center md:flex-col md:w-52'>
        <li>
          <Link className={path === '/' ? 'text-orange-400' : ''} href='/'>
            Home
          </Link>
        </li>

        <li>
          <Link
            className={path.match('/movies') ? 'text-orange-400' : ''}
            href='/movies'
          >
            Movies
          </Link>
        </li>

        <li>
          <Link
            className={path === '/policy/privacy' ? 'text-orange-400' : ''}
            href='/policy/privacy'
          >
            Privacy
          </Link>
        </li>

        <li>
          <Link
            className={path === '/policy/terms' ? 'text-orange-400' : ''}
            href='/policy/terms'
          >
            Terms
          </Link>
        </li>
      </ul>
    </nav>
  );
}
