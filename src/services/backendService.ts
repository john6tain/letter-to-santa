export default class BackendService {
    static get(url: string, headers?: { [key: string]: string }): Promise<Response> {
        return fetch(url, {
            method: 'GET',
            headers: headers ||
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
        });
    }

    static post(url: string, body: any, headers?: { [key: string]: string }): Promise<Response> {
        return fetch(url, {
            method: 'POST',
            headers: headers ||
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            body: JSON.stringify(body),
        });
    }

    static delete(url: string, headers?: { [key: string]: string }): Promise<Response> {
        return fetch(url, {
            method: 'DELETE',
            headers: headers ||
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
        });
    }
}