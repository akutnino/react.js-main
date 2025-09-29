import type { SetCitiesType } from '../types/contexts/types.ts';
import type { SetIsLoadingType } from '../types/functions/types.ts';

export const deleteCityData = async (
	cityID: string,
	setIsLoading: SetIsLoadingType,
	setCities: SetCitiesType
) => {
	try {
		setIsLoading(true);

		const fetchURL: RequestInfo | URL = `http://localhost:8000/cities/${cityID}`;
		const fetchOptions: RequestInit = {
			method: 'DELETE',
		};

		const response: Response = await fetch(fetchURL, fetchOptions);
		if (!response.ok) throw new Error('Failed Fetch Request');

		setCities((currentCities) => currentCities.filter((city) => city.id !== cityID));
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	} finally {
		setIsLoading(false);
	}
};
