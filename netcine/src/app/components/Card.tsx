import Image from 'next/image';
import { CardGenresType, CardLanguagesType, CardType } from '../types/components/CardTypes';
import { useState } from 'react';
import { PlayerVideo } from './PlayerVideo';
import { searchGenresMovie } from '../functions/card/searchGenresMovie';
import { filterLanguage } from '../functions/card/filterLanguageMovie';
import { CardBackBody } from './CardBackBody';
import { updateValuesStateInformations } from '../functions/card/updateValuesStateInformations';
import { useInformationsMoviesOrTVContext } from '../context';

export default function Card({ values }: CardType) {
	const { handleStateChangeInformationsMoviesOrTV } = useInformationsMoviesOrTVContext();
	const { movie, type } = values;
	const [urlMovie, setUrlMovie] = useState<string>('');
	const [cardSelected, setCardSelected] = useState<boolean>(true);
	const genres: CardGenresType[] = searchGenresMovie(movie.genre_ids);
	const languages: CardLanguagesType = filterLanguage(movie.original_language);

	return (
		<section
			className='carousel-card'
			onMouseEnter={() =>
				updateValuesStateInformations({
					values: {
						cardSelected,
						genres,
						languages,
						movie,
						setCardSelected,
						setUrlMovie,
						type,
						urlMovie,
						handleStateChangeInformationsMoviesOrTV,
					},
				})
			}
			onMouseLeave={() => setCardSelected(false)}
		>
			<section className='carousel-card-front'>
				<section className='carousel-card-header'>
					<Image
						className='carousel-card-image'
						src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
						width={215}
						height={130}
						alt={`${type === 'movie' ? movie.title : movie.name} - Front`}
						priority={true}
					/>
				</section>
			</section>
			<section className='carousel-card-back'>
				<PlayerVideo values={{ movie, urlMovie, cardSelected, type }} />
				<CardBackBody values={{ movie, genres, languages, type }} />
			</section>
		</section>
	);
}
