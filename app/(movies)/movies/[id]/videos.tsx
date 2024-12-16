import { MOVIE_URL } from '@/constants/url';

export const getVideosById = (id: string) =>
  fetch(`${MOVIE_URL}/${id}/videos`).then(response => response.json());

export default async function Videos({ id }: { id: string }) {
  const data = await getVideosById(id);

  return (
    <div className='movie-video'>
      <h3 className='text-2xl'>Videos</h3>

      <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
        {data.map((video: any, index: number) => {
          return (
            index < 4 && (
              <li className='w-full rounded-lg overflow-hidden'>
                <iframe
                  key={video.id}
                  className='w-full'
                  src={`https://youtube.com/embed/${video.key}`}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  title={video.name}
                />
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
