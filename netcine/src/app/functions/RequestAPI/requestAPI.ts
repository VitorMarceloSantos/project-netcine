import { RequestInformationsAPI } from '@/app/api/RequestInformationsAPI';
import { MovieOrTVDataType } from '@/app/types/api/RequestAPI';

export const RequestTopMovies = async () => {
	const urlTopMovies =
		'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
	const { results } = await RequestInformationsAPI<MovieOrTVDataType>(urlTopMovies);
	return results;
};

export const RequestTopSeries = async () => {
	const urlTopSeries = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
	const { results } = await RequestInformationsAPI<MovieOrTVDataType>(urlTopSeries);
	return results;
};
