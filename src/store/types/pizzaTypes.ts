export type ingridientType = {
	value: string;
	allergic: boolean;
};

export interface IPizzaStateType {
	id: number;
	title: string;
	description: string;
	imgPath: string;
	ingridients: ingridientType[];
}