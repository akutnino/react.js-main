export type MenuDataType = {
	id: number;
	name: string;
	unitPrice: number;
	imageUrl: string;
	ingredients: string[];
	soldOut: boolean;
};

export type MenuDataArrayType = MenuDataType[];

export type MenuType = MenuDataArrayType | null;

export type MenuInitialStateType = {
	menu: MenuType;
	isLoading: boolean;
	errorMessage: null | string;
};
