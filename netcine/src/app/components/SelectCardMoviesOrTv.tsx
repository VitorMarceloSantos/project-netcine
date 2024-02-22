'use client';
import { useEffect } from 'react';
import { getItemsPerScreen } from '../functions/card/getItemsPerScreen';
import { CardMoviesOrPeopleType, ResultsType } from '../types/components/CarouselMoviesTypes';
import Card from './Card';
import { getWidthWindow } from './getWidthWindow';
import { addClassCard } from '../functions/card/addClassCard';

export const SelectCardMoviesOrTv = ({ values }: CardMoviesOrPeopleType) => {
	const movies = values.movies as unknown as ResultsType[];
	const { type, slider } = values;

	useEffect(() => {
		const widthView = getWidthWindow();
		const listCards = window.document.querySelectorAll('.carousel-item');
		const itemsPerScreen = getItemsPerScreen(widthView);
		addClassCard({ values: { itemsPerScreen, listCards } });
	}, []);

	return (
		<ul className='carousel-movies' ref={slider}>
			{movies.map((movie, index) => {
				return (
					<li className='carousel-item' key={`${movie.id}-${index}`}>
						<Card
							values={{
								movie,
								type: type === 'treding' ? (movie.media_type as string) : type,
							}}
						/>
					</li>
				);
			})}
		</ul>
	);
};
