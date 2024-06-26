import { useRef, useState } from 'react';
import Image from 'next/image';
import { getUrPeople } from '@/app/functions/cardPeople/getUrlInformations';
import { CardPeopleType } from '@/app/types/components/CardPeople';
import { CardBackPeopleBody } from './CardBackPeopleBody';
import ErroImagem from '@/app/images/errorVideo.png';
import { useInformationsPeoplesContext } from '@/app/context';

export default function CardPeople({ values }: CardPeopleType) {
	const { people, index, setList } = values;
	const { handleStateChangeInformationsPeoples } = useInformationsPeoplesContext();
	const URL_IMG = people.profile_path === null ? ErroImagem : `https://image.tmdb.org/t/p/w500${people.profile_path}`;
	const cardFront = useRef<HTMLElement>(null);
	const cardBack = useRef<HTMLElement>(null);
	const [acessCardHover, setAcessCardHover] = useState<boolean>(false);
	const NUMBER_SEVEN_HUNDRED_FIFTY = 750;
	const createNameClass = `peoples_${index}`;

	const resetCard = () => {
		if (acessCardHover === true) {
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
				getUrPeople({
					values: {
						peopleId: people.id,
						handleStateChangeInformationsPeoples,
					},
				});
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
						onLoad={() => setList((prevState) => [...prevState, 'true'])}
						className='carousel-card-image'
						src={URL_IMG}
						width={500}
						height={500}
						alt={`${people.name}`}
						priority={true}
					/>
				</section>
			</section>
			<section className='carousel-card-back' ref={cardBack}>
				<section className='carousel-card-header'>
					<Image
						className='carousel-card-image'
						src={URL_IMG}
						width={215}
						height={130}
						alt={`${people.name}`}
						priority={true}
					/>
				</section>
				<CardBackPeopleBody values={{ name: people.name, knowFor: people.known_for }} />
			</section>
		</section>
	);
}
