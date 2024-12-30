import { Metadata } from 'next';
import Link from 'next/link';

import { MOVIE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Movies',
  description: 'Movies'
};

const getMovies = async () =>
  fetch(MOVIE_URL).then(response => response.json());

export default async function Movies() {
  const movies = await getMovies();

  return (
    <div className='page-movies'>
      <h1 className='text-2xl'>Movies</h1>

      <ul className='mt-5 grid grid-cols-2 gap-4 md:grid-cols-4'>
        {movies.map((movie: any) => {
          const { id, title, poster_path } = movie;

          return (
            <li key={id}>
              <Link
                className='opacity-80 hover:opacity-100 transition-opacity'
                prefetch
                href={`/movies/${id}?type=`}
              >
                <img className='rounded-lg' src={poster_path} alt={title} />

                <h5 className='text-ellipsis overflow-hidden whitespace-nowrap'>
                  {title}
                </h5>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
