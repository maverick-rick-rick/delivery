
export type ingredientType = {
	value: string;
	allergic: boolean;
};

export interface IPizzaStateType {
	id: number;
	title: string;
	description: string;
	imgPath: string;
	ingredients: ingredientType[];
}

export type IngredientType = {
	value: string;
	allergic: boolean;
};

export type BufferIngredientType = {
	payload: IngredientType,
	index: number | null
};