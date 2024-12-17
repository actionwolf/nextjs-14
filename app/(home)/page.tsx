import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-5 p-5 my-auto'>
      <div className='flex flex-col gap-4 items-center'>
        <h1 className='text-9xl font-extrabold'>Start</h1>
      </div>

      <Link className='text-xl font-medium' href='/member/join'>
        Join
      </Link>

      <div className='flex flex-row gap-4 items-center'>
        <span>Already had id</span>

        <Link className='text-xl font-medium' href={'/member/login'}>
          Login
        </Link>
      </div>
    </div>
  );
}
