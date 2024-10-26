import React, {useState} from "react";
import Login from "@/pages/login";
import Register from "@/pages/register";
import {useAuth} from "@/context/AuthContext";
import MyWishes from "@/pages/my-wishes";
import AllWishes from "@/pages/allWishes";
import ToGive from "@/pages/to-give";
import MyDinner from "@/pages/my-dinner";
import Admin from "@/pages/admin";

export default function Index() {
	const [isLogin, setIsLogin] = useState(false);
	const [isRegister, setIsRegister] = useState(false);
	const {isAuthenticated, currentMenu} = useAuth();

	function clickRegister() {
		setIsRegister(true);
		setIsLogin(false);
	}

	function clickLogin() {
		setIsRegister(false);
		setIsLogin(true);
	}

	return (

		<div>
			{!isAuthenticated && <div
                className="animate-feather-flutter grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center">
					{!isLogin && !isRegister && <h2>Дядо Kоледа е вече на години и не помни имена, затова</h2>}
					{isLogin && !isRegister && (<Login clickRegister={clickRegister}/>)}
					{isRegister && !isLogin && (<Register clickLogin={clickLogin}/>)}
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
                </main>
            </div>
			}
			{isAuthenticated && (currentMenu === 'wishes' && <MyWishes/>) ||
				(isAuthenticated && currentMenu === 'select-all' && <AllWishes/>) ||
				(isAuthenticated && currentMenu === 'dinner' && <MyDinner/>) ||
				(isAuthenticated && currentMenu === 'toGive' && <ToGive/>) || currentMenu
			}

		</div>
	);
}