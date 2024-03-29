import { dataGenres } from '@/app/data/dataGenres';
import { CardGenresType } from '@/app/types/components/CardTypes';

const filterGenre = (genre: number): CardGenresType => {
	return dataGenres.find((genreData) => genreData.id === genre) as CardGenresType;
};

export const searchGenresMovie = (genresMovie: number[]): CardGenresType[] => {
	const genres: CardGenresType[] = [];
	genresMovie.forEach((genre) => {
		genres.push(filterGenre(genre));
	});
	return genres;
};
