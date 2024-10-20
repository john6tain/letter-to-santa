// src/services/authService.ts
class AuthService {
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
