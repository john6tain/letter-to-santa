import React, {useState} from "react";
import {useNotification} from "@/components/NotificationContext";

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { notify } = useNotification();

	async function login() {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({username, password}),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('token', data.token);
			notify(data.message,  'success');
		} else {
			const errorData = await response.json();
			console.error('Login error:', errorData.message);
			notify(errorData.message, 'error');
		}
	}

	return (
		<div>
			<label htmlFor="name"
						 className="block mb-2 text-sm font-medium text-white-900 dark:text-white">
				Напиши си името</label>
			<input type="text" id="name"
						 value={username}
						 onChange={(e) => setUsername(e.target.value)}
						 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						 placeholder="Име" required/>
			<div><label htmlFor="password"
									className="block mb-2 text-sm font-medium text-white-900 dark:text-white">
				Парола</label>
				<input type="password" id="password"
							 value={password}
							 onChange={(e) => setPassword(e.target.value)}
							 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							 placeholder="Парола" required/>
			</div>
			<button type="button"
							className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
							onClick={() => login()}>Вписване
			</button>
		</div>
	)
}