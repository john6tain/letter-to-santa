// src/services/authService.ts
class AuthService {
	static setUsername(username: string) {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('user', JSON.stringify({username: username}));
		}
	}

	static getUsername() {
		if (typeof window !== 'undefined') {
			const user = sessionStorage.getItem('user');
			if (user) {
				const parsedUser = JSON.parse(user);
				return parsedUser.username;
			}
		}
	}

	static login(token: string) {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('token', token);
		}
	}

	static logout() {
		if (typeof window !== 'undefined') {
			sessionStorage.removeItem('token');
			sessionStorage.clear();
		}
	}

	static isAuthenticated(): boolean {
		if (typeof window !== 'undefined') {
			return !!sessionStorage.getItem('token');
		}
		return false; // Default to false on server-side
	}

}

export default AuthService;
