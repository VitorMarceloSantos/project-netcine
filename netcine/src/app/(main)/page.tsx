import PopularPeoples from '../components/PopularPeoples';
import TopMovies from '../components/TopMovies';
import TopSeries from '../components/TopSeries';
import TredingDay from '../components/TredingDay';
import TredingWeek from '../components/TredingWeek';
import { PlayerVideoBannerURL } from '../components/PlayerVideoBannerURL';
import { randomVideo } from '../functions/PlayerVideo/randomVideo';
import { RequestInformationsAPI } from '../api/RequestInformationsAPI';
import { MovieOrTVDataType } from '../types/api/RequestAPI';

import { getCurrentUser } from '../lib/session';

export default async function Home() {
	const user = await getCurrentUser();

	const urlTrendingHom = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
	const { results } = await RequestInformationsAPI<MovieOrTVDataType>(urlTrendingHom);
	const numberRandom = randomVideo(results.length - 1);
	const videoBanner = results[numberRandom];
	return (
		<main>
			<p style={{ color: 'white' }}>{JSON.stringify(user)}</p>
			<PlayerVideoBannerURL
				values={{
					// type: videoBanner?.media_type ? videoBanner.media_type : 'movie',
					type: videoBanner.media_type as string,
					videoId: videoBanner.id,
					img: videoBanner.backdrop_path,
				}}
			/>
			<TopMovies />
			<TopSeries />
			<TredingDay value={{ results }} />
			<TredingWeek />
			<PopularPeoples />
		</main>
	);
}