import { Suspense } from 'react';
import { RequestInformationsAPI } from '../api/RequestInformationsAPI';
import { CarouselMovies } from './CarouselMovies';
import { SkeletonCarousel } from './SkeletonCarousel';
import { MovieOrTVDataType } from '../types/api/RequestAPI';

const urlTrendingTVs = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';

export default async function TrendingTVs() {
	const { results } = await RequestInformationsAPI<MovieOrTVDataType>(urlTrendingTVs);

	return (
		<article className='container-movies-tvs-peoples'>
			<Suspense fallback={<SkeletonCarousel />}>
				<CarouselMovies
					values={{
						resultData: results.sort(function (a, b) {
							return a.id - b.id;
						}),
						type: 'tv',
						title: 'Tendências',
					}}
				/>
			</Suspense>
		</article>
	);
}