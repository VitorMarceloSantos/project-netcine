import { Suspense } from 'react';
import { RequestInformationsAPI } from '../api/RequestInformationsAPI';
import { CarouselMovies } from './CarouselMovies';
import { SkeletonCarousel } from './SkeletonCarousel';
import { MovieOrTVDataType } from '../types/api/RequestAPI';

const urlTrendingMovies = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

export default async function TrendingMovies() {
	const { results } = await RequestInformationsAPI<MovieOrTVDataType>(urlTrendingMovies);

	return (
		<article className='container-movies-tvs-peoples'>
			<Suspense fallback={<SkeletonCarousel />}>
				<CarouselMovies
					values={{
						resultData: results.sort(function (a, b) {
							return a.id - b.id;
						}),
						type: 'movie',
						title: 'Tendências',
					}}
				/>
			</Suspense>
		</article>
	);
}