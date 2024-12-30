import { MOVIE_URL } from '@/lib/constants';

export const getDetailById = async (id: string) =>
  fetch(`${MOVIE_URL}/${id}`).then(response => response.json());

export default async function Detail({ id }: { id: string }) {
  const { title, poster_path, overview }: any = await getDetailById(id);

  return (
    <div>
      <h1 className='text-2xl'>{title}</h1>

      <div className='mt-5 flex flex-col gap-4 md:flex-row'>
        <img
          className='w-full rounded-xl md:w-80'
          src={poster_path}
          alt={title}
        />

        <p>{overview}</p>
      </div>
    </div>
  );
}
