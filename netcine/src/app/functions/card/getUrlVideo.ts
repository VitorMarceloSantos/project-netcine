import { RequestUrlVideo } from '../../api/RequestUrlVideo';
import { GetUrlVideoType } from '../../types/components/CardTypes';

export const getUrlVideo = ({ values }: GetUrlVideoType): void => {
	const { movieId, urlMovie, setCardSelected, setUrlMovie } = values;
	urlMovie === '' &&
		(async () => {
			setUrlMovie((await RequestUrlVideo(movieId)) as string);
		})();
	// RequestUrlVideo(movieId)
	setCardSelected(true);
};
