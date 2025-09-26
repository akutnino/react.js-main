import type {
	SetIsLoadingType,
	SetResponseDataType,
	ResponseDataType,
} from '../types/functions/types.ts';

export const getCityData = async (
	urlPath: string,
	setIsLoading: SetIsLoadingType,
	setResponseData: SetResponseDataType
) => {
	try {
		setIsLoading(true);

		const fetchURL: string = `http://localhost:8000/${urlPath}`;
		const fetchOptions: RequestInit = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};

		const response: Response = await fetch(fetchURL, fetchOptions);
		if (!response.ok) throw new Error('Failed Fetch Request');

		const responseData: ResponseDataType = await response.json();
		setResponseData(responseData);
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	} finally {
		setIsLoading(false);
	}
};
