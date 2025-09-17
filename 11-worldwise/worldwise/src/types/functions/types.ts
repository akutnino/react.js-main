import type { Dispatch } from 'react';
import type { CityDataType } from '../components/types.ts';

export type SetResponseDataType =
	| Dispatch<React.SetStateAction<CityDataType | null>>
	| Dispatch<React.SetStateAction<CityDataType[]>>;

export type SetIsLoadingType = Dispatch<React.SetStateAction<boolean>>;

export type ResponseDataType = CityDataType[] & CityDataType;
