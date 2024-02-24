import { Suspense } from 'react';
import { ModalMovies } from './components/ModalMovies';
import { NavBar } from './components/NavBar';
import PopularPeoples from './components/PopularPeoples';
import { SideMenu } from './components/SideMenu';
import TopMovies from './components/TopMovies';
import TopSeries from './components/TopSeries';
import TredingDay from './components/TredingDay';
import TredingWeek from './components/TredingWeek';
import { Banner } from './components/Banner';

export default function Home() {
	return (
		<main>
			<Suspense>
				<ModalMovies />
			</Suspense>
			<SideMenu>
				<NavBar />
				<Banner />
				<TopMovies />
				<TopSeries />
				<TredingDay />
				<TredingWeek />
				<PopularPeoples />
			</SideMenu>
		</main>
	);
}
