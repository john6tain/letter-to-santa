// src/context/AuthContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import AuthService from '../services/authService';

interface AuthContextProps {
	isAuthenticated: boolean;
	loading: boolean;
	login: (data: { username: string, token: string }) => void;
	logout: () => void;
	setCurrentMenu: (token: string) => void;
	currentMenu: string;
	username: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [currentMenu, setCurrentMenu] = useState<string>('wishes');
	const [username, setUsername] = useState<string>('');

	useEffect(() => {
		// Check authentication status on mount
		const checkAuth = () => {
			const authStatus = AuthService.isAuthenticated();
			setIsAuthenticated(authStatus);
			setLoading(false);
		};

		checkAuth();
	}, []);

	const login = (data: { username: string, token: string }) => {
		AuthService.login(data.token);
		setIsAuthenticated(true);
		setUsername(data.username);
	};

	const logout = () => {
		AuthService.logout();
		setIsAuthenticated(false); // Update the state to reflect logout
	};

	return (
		<AuthContext.Provider value={{isAuthenticated, loading, login, logout, setCurrentMenu, currentMenu, username}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
