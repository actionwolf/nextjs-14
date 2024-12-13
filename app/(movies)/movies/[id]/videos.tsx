import '../../../../scss/movie-video.scss';

import { MOVIE_URL } from '../../../../constants/url';

export const getVideosById = (id: string) =>
  fetch(`${MOVIE_URL}/${id}/videos`).then(response => response.json());

export default async function Videos({ id }: { id: string }) {
  const data = await getVideosById(id);

  return (
    <div className='movie-video'>
      <h3>Videos</h3>

      <ul>
        {data.map((video: any) => {
          return (
            <li>
              <iframe
                key={video.id}
                src={`https://youtube.com/embed/${video.key}`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title={video.name}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
