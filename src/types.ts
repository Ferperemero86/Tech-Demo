export type Todo = {
	title: string;
	description: string;
	id: number;
	isCompleted: boolean;
	imageUrl: string;
};

export type FormData = {
	title: string;
	description: string;
};

export type CardMenu = {
	id?: number;
	isCompleted: boolean;
	todo?: Todo;
};
