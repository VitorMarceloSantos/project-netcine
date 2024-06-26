import { Skeleton } from '@mui/material';
import { SkeletonCard } from './SkeletonCard';

export const SkeletonCarouselWithTitle = () => {
	const NUMBER_SIX = 6;
	const newArray = new Array(NUMBER_SIX).fill({});

	return (
		<>
			<section className='progress-bar'>
				<section className='progress-bar-title-container'>
					<Skeleton
						sx={{ bgcolor: '#333333', fontSize: '1.2rem', marginTop: '1rem' }}
						variant='text'
						width='130px'
						height='35px'
					/>
				</section>
			</section>
			<section className='skeleton-card'>
				<section className='skeleton-card-ul'>
					<ul>
						{newArray.map((index) => {
							return (
								<li key={index} style={{ margin: '0 .2rem' }}>
									<SkeletonCard />
								</li>
							);
						})}
					</ul>
				</section>
			</section>
		</>
	);
};
