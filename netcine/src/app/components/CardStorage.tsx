'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { PlayerVideo } from './PlayerVideo';
import { CardBackBody } from './CardBackBody';
import { UpdateValuesStateInformations } from '@/app/functions/card/UpdateValuesStateInformations';
import { useInformationsMoviesOrTVContext } from '@/app/context';
import ErroImagem from '@/app/images/errorVideo.png';
import { usePlayerVideo } from '@/app/context';
import { CardStorageType } from '@/app/types/components/CardStorage';

export default function CardStorage({ values }: CardStorageType) {
	const { genres, languages, movie, type, urlMovie: urlParams, title, index } = values;
	const { handleStateVideo } = usePlayerVideo();
	const { handleStateChangeInformationsMoviesOrTV } = useInformationsMoviesOrTVContext();
	const [urlMovie, setUrlMovie] = useState<string>(urlParams);
	const [cardSelected, setCardSelected] = useState<boolean>(true);
	const valuesProps = {
		cardSelected,
		genres,
		languages,
		movie,
		setCardSelected,
		setUrlMovie,
		type,
		urlMovie,
		handleStateChangeInformationsMoviesOrTV,
	};
	const URL_IMG = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	const cardFront = useRef<HTMLElement>(null);
	const cardBack = useRef<HTMLElement>(null);
	const [acessCardHover, setAcessCardHover] = useState<boolean>(false);
	const NUMBER_SEVEN_HUNDRED_FIFTY = 750;
	const createNameClass = `${title!.toLocaleLowerCase().replaceAll(' ', '')}_${index}`;

	const resetCard = () => {
		if (acessCardHover === true) {
			handleStateVideo(true);
			setCardSelected(false);
			cardFront.current!.style.opacity = '1';
			cardBack.current!.style.opacity = '0';
		}
	};

	const updateCard = () => {
		const verifyClass = document.querySelector(`.${createNameClass}`);
		const timeoutId = setTimeout(() => {
			if (verifyClass?.matches(':hover')) {
				cardFront.current!.style.opacity = '0';
				cardBack.current!.style.opacity = '1';
				UpdateValuesStateInformations({
					values: { ...valuesProps },
				});
				handleStateVideo(false);
				setAcessCardHover(true);
			}
		}, NUMBER_SEVEN_HUNDRED_FIFTY);
		return () => clearTimeout(timeoutId);
	};

	return (
		<section
			className={`carousel-card ${createNameClass}`}
			onMouseEnter={() => updateCard()}
			onMouseLeave={() => resetCard()}
		>
			<section className='carousel-card-front' ref={cardFront}>
				<section className='carousel-card-header'>
					<Image
						className='carousel-card-image'
						src={movie.poster_path === null ? ErroImagem : URL_IMG}
						width={500}
						height={500}
						alt={`${type === 'movie' ? movie.title : movie.name} - Front`}
						priority={true}
					/>
				</section>
			</section>
			<section className='carousel-card-back' ref={cardBack}>
				<PlayerVideo values={{ movie, urlMovie, cardSelected, type }} />
				<CardBackBody values={{ movie, genres, languages, type, urlMovie }} />
			</section>
		</section>
	);
}
