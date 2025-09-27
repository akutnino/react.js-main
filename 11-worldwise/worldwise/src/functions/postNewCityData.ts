import type { CityDataType } from '../types/components/types.ts';
import type { SetCitiesType } from '../types/contexts/types.ts';
import type { SetIsLoadingType } from '../types/functions/types.ts';

export const postNewCityData = async (
	newCityData: CityDataType,
	setIsLoading: SetIsLoadingType,
	setCities: SetCitiesType
) => {
	try {
		setIsLoading(true);

		const fetchURL: RequestInfo | URL = `http://localhost:8000/cities`;
		const fetchOptions: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCityData),
		};

		const response: Response = await fetch(fetchURL, fetchOptions);
		if (!response.ok) throw new Error('Failed Fetch Request');

		const data: CityDataType = await response.json();
		if (!data.id) throw new Error('API Post Request Failed');

		setCities((currentState) => [...currentState, data]);
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	} finally {
		setIsLoading(false);
	}
};
