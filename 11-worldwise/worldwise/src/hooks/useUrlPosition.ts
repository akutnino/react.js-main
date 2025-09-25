import { useSearchParams } from 'react-router';
import type { UseSearchParamsType } from '../types/components/types.ts';

function useUrlPosition() {
	const [searchParams]: UseSearchParamsType = useSearchParams();
	const lat: string | null = searchParams.get('lat');
	const lng: string | null = searchParams.get('lng');

	return [lat, lng];
}

export { useUrlPosition };
