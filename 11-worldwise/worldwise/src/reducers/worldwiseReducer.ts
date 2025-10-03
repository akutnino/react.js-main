import type {
	WorldwiseActionType,
	WorldwiseInitialStateType,
} from '../types/reducers/types.ts';

export const WORLDWISE_INITIAL_STATE: WorldwiseInitialStateType = {
	cities: [],
	isLoading: false,
	currentCity: null,
	errorMessage: null,
};

export function worldwiseReducer(
	currentState: WorldwiseInitialStateType,
	action: WorldwiseActionType
): WorldwiseInitialStateType {
	switch (action.type) {
		case 'cities/loading': {
			return {
				...currentState,
				isLoading: true,
			};
		}
		case 'cities/loaded': {
			return {
				...currentState,
				isLoading: false,
				cities: action.payload,
			};
		}
		case 'city/loaded': {
			return {
				...currentState,
				isLoading: false,
				currentCity: action.payload,
			};
		}
		case 'cities/created': {
			return {
				...currentState,
				isLoading: false,
				cities: [...currentState.cities, action.payload],
			};
		}
		case 'cities/deleted': {
			return {
				...currentState,
				isLoading: false,
				cities: currentState.cities.filter((city) => city.id !== action.payload),
			};
		}
		case 'cities/rejected': {
			return {
				...currentState,
				isLoading: false,
				errorMessage: action.payload,
			};
		}
		default: {
			return currentState;
		}
	}
}
