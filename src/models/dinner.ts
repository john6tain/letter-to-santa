import User from "@/models/user";

export default interface Dinner {
	id: number;
	title: string;
	description: string | null;
	link: string | null;
	user: User;
}