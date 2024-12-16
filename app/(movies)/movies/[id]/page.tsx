import { Suspense } from 'react';
import { Metadata } from 'next';

import Detail, { getDetailById } from './detail';
import Videos, { getVideosById } from './videos';

interface IMovieDetailProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string }>;
}

export const generateMetadata = async ({
  params
}: IMovieDetailProps): Promise<Metadata> => {
  const { id } = await params;
  const { title, overview, homepage, backdrop_path } = await getDetailById(id);

  return {
    title,
    description: overview,
    openGraph: {
      title,
      description: overview,
      url: homepage,
      /**
      siteName: 'Example Store',
      type: 'product',
      */
      images: [
        {
          url: backdrop_path,
          width: 1280,
          height: 720
        }
      ],
      locale: 'en_US'
    }
  };
};

const getContent = async (id: string): Promise<any> =>
  Promise.all([getDetailById(id), getVideosById(id)]);

export default async function MovieDetail({
  params,
  searchParams
}: IMovieDetailProps) {
  const { id }: any = await params;
  const { type }: any = await searchParams;
  const { 0: detail, 1: videos }: any = await (!!type ? getContent(id) : {});

  return (
    <div className='flex flex-col gap-5'>
      {!type ? (
        <>
          <Suspense fallback={<h3>Wait (@Detail)</h3>}>
            <Detail id={id} />
          </Suspense>

          <Suspense fallback={<h3>Wait (@Video)</h3>}>
            <Videos id={id} />
          </Suspense>
        </>
      ) : (
        <>
          <h1 className='text-2xl'>{detail.title} (@Use getContent)</h1>

          <img
            className='rounded-lg'
            src={detail.poster_path}
            alt={detail.original_title}
          />

          <p>{detail.overview}</p>
        </>
      )}
    </div>
  );
}
