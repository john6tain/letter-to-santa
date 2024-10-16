// src/services/authService.ts
class AuthService {
    static login(token: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
    }

    static logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    }

    static isAuthenticated(): boolean {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('token');
        }
        return false; // Default to false on server-side
    }
}

export default AuthService;
