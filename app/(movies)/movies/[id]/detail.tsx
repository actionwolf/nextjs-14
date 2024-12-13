import '../../../../scss/movie-detail.scss';

import { MOVIE_URL } from '../../../../constants/url';

export const getDetailById = (id: string) =>
  fetch(`${MOVIE_URL}/${id}`).then(response => response.json());

export default async function Detail({ id }: { id: string }) {
  const { title, poster_path, overview }: any = await getDetailById(id);

  return (
    <div className='movie-detail'>
      <h1>{title}</h1>

      <div>
        <img src={poster_path} alt={title} />

        <p>{overview}</p>
      </div>
    </div>
  );
}
