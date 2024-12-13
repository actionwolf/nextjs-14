import '../../../../scss/movie-view.scss';

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
  const { title, overview } = await getDetailById(id);

  return {
    title,
    description: overview
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
    <div className='movie-view'>
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
          <h1>{detail.title} (@Use getContent)</h1>

          <p>{detail.overview}</p>

          <img src={detail.poster_path} alt={detail.original_title} />
        </>
      )}
    </div>
  );
}
