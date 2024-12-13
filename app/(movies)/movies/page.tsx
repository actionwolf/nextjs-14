import '../../../scss/movies.scss';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Movies',
  description: 'Movies'
};

export const URL: string =
  'https://nomad-movies.nomadcoders.workers.dev/movies';

const getMovies = async () => fetch(URL).then(response => response.json());

export default async function Movies() {
  const movies = await getMovies();

  return (
    <div className='page-movies'>
      <h1>Movies</h1>

      <ul>
        {movies.map((movie: any) => {
          const { id, title, poster_path } = movie;

          return (
            <li key={id}>
              <Link href={`/movies/${id}?type=`}>
                <img src={poster_path} alt={title} />

                <h5>{title}</h5>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
