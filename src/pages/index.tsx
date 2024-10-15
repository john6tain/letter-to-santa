import React, {useState} from "react";
import Toaster from '../components/toaster';
import Login from "@/pages/login";
import Register from "@/pages/register";

export default function Index() {
	const [isLogin, setIsLogin] = useState(false);
	const [isRegister, setIsRegister] = useState(false);
	return (

		<div>

			<h2>Дядо Kоледа е вече на години и не помни имена затова</h2>
			{isLogin && !isRegister && (<Login/>)}
			{isRegister && !isLogin && (<Register/>)}
			{!isLogin && !isRegister &&
				<div>
				<button type="button"
														className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
														onClick={() => setIsLogin(true)}>Вписване
			</button>
			<a className="mr-2">или</a>
			<button type="button"
															 className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
															 onClick={() => setIsRegister(true)}>Регистрация
			</button>
				</div>}

		</div>
	);
}