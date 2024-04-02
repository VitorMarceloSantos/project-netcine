import { SkeletonCarouselWithTitle } from './SkeletonCarouselWithTitle';

export const SkeletonPage = () => {
	const newArray = new Array(5).fill({});
	return (
		<ul style={{ marginTop: '8vh' }}>
			{newArray.map((index) => {
				return (
					<li key={index} style={{ margin: '2rem .2rem' }}>
						<SkeletonCarouselWithTitle />
					</li>
				);
			})}
		</ul>
	);
};
