'use client';

import '../scss/navigation.scss';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const flag: string = ' 🚩';

  const path: string = usePathname();

  return (
    <nav className='navigation'>
      <ul>
        <li>
          <Link href='/'>Home {path === '/' ? flag : ''}</Link>
        </li>

        <li>
          <Link href='/movies'>Movies {path.match('/movies') ? flag : ''}</Link>
        </li>

        <li>
          <Link href='/policy/privacy'>
            Privacy {path === '/policy/privacy' ? flag : ''}
          </Link>
        </li>

        <li>
          <Link href='/policy/terms'>
            Terms {path === '/policy/terms' ? flag : ''}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
