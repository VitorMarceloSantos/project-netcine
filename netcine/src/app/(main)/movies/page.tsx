import NowPlaying from '../../components/NowPlaying';
import TopMovies from '../../components/TopMovies';
import UpComing from '../../components/UpComing';
import PopularMovies from '../../components/PopularMovies';
import TrendingMovies from '../../components/TrendingMovies';
import { randomVideo } from '../../functions/PlayerVideo/randomVideo';
import { PlayerVideoBannerURL } from '../../components/PlayerVideoBannerURL';
import { MovieOrTVDataType } from '../../types/api/RequestAPI';
import { RequestInformationsAPI } from '../../api/RequestInformationsAPI';

export default async function Movies() {
	const urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
	const { results } = await RequestInformationsAPI<MovieOrTVDataType>(urlNowPlaying);
	const videoBanner = results[randomVideo(results.length - 1)];

	return (
		<main>
			<PlayerVideoBannerURL values={{ type: 'movie', videoId: videoBanner.id, img: videoBanner.backdrop_path }} />
			<TopMovies />
			<NowPlaying value={{ results }} />
			<PopularMovies />
			<UpComing />
			<TrendingMovies />
		</main>
	);
}