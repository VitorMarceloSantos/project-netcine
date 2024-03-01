import { Suspense } from 'react';
import { RequestInformationsAPI } from '../api/RequestInformationsAPI';
import { CarouselMovies } from './CarouselMovies';
import { SkeletonCarousel } from './SkeletonCarousel';
import { MovieOrTVDataType } from '../types/api/RequestAPI';

const urlAiringToday = 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1';

export default async function AiringToday() {
	const { results } = await RequestInformationsAPI<MovieOrTVDataType>(urlAiringToday);

	return (
		<article className='container-movies-tvs-peoples'>
			<Suspense fallback={<SkeletonCarousel />}>
				<CarouselMovies
					values={{
						resultData: results.sort(function (a, b) {
							return b.id - a.id;
						}),
						type: 'tv',
						title: 'Em Exibição Hoje',
					}}
				/>
			</Suspense>
		</article>
	);
}
