export default class BackendService {
	static async get(url: string, onUnauthorized?: () => void, headers?: { [key: string]: string }): Promise<Response> {
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: headers || {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			});

			if (!response.ok) {
				if (response.status === 401 && onUnauthorized) {
					// Call the logout handler on 401 Unauthorized
					onUnauthorized();
				}
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}

			return await response.json();
		} catch (error: any) {
			throw new Error(error.message || 'An unknown error occurred');
		}
	}

	static async post(url: string,body:any, onUnauthorized?: () => void, headers?: { [key: string]: string }): Promise<Response> {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: headers ||
					{
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${sessionStorage.getItem('token')}`
					},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				if (response.status === 401 && onUnauthorized) {
					// Call the logout handler on 401 Unauthorized
					onUnauthorized();
				}
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}

			return await response.json();
		} catch (error: any) {
			throw new Error(error.message || 'An unknown error occurred');
		}
	}

	static async delete(url: string, onUnauthorized?: () => void, headers?: { [key: string]: string }): Promise<Response> {
		try {
			const response = await fetch(url, {
				method: 'DELETE',
				headers: headers ||
					{
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${sessionStorage.getItem('token')}`
					},
			});

			if (!response.ok) {
				if (response.status === 401 && onUnauthorized) {
					// Call the logout handler on 401 Unauthorized
					onUnauthorized();
				}
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}

			return await response.json();
		} catch (error: any) {
			throw new Error(error.message || 'An unknown error occurred');
		}
	}
}