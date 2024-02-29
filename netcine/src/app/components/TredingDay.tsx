import { RequestInformationsAPI } from '../api/RequestInformationsAPI';
import { MovieDataType } from '../types/api/RequestAPI';
import { CarouselMovies } from './CarouselMovies';

const urlTredingDay = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';

export default async function TredingDay() {
	const { results } = await RequestInformationsAPI<MovieDataType>(urlTredingDay);

	return (
		<article className='container-movies-tvs-peoples'>
			<CarouselMovies values={{ resultData: results, type: 'treding', title: 'Mais assistidos de Hoje' }} />
		</article>
	);
}