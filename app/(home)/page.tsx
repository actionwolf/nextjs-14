import Link from 'next/link';

export default function Home() {
  return (
    <div className='h-full flex flex-col items-center gap-5 p-5'>
      <Link className='primary-button' href='/member/join'>
        Join
      </Link>

      <Link className='primary-button' href={'/member/login'}>
        Login
      </Link>
    </div>
  );
}
