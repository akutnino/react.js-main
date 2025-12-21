export type MenuDataType = {
	id: number;
	name: string;
	unitPrice: number;
	imageUrl: string;
	ingredients: string[];
	soldOut: boolean;
}[];

export type MenuInitialStateType = {
	menu: MenuDataType | null;
	isLoading: boolean;
	errorMessage: string;
};
