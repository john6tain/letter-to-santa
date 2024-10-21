export default interface AuthContextProps {
	isAuthenticated: boolean;
	loading: boolean;
	setLoading: (value: boolean) => void;
	login: (data: { username: string, token: string }) => void;
	logout: () => void;
	setCurrentMenu: (token: string) => void;
	currentMenu: string;
	username: string;
}
