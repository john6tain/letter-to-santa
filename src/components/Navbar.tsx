import {useAuth} from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/Loader";
import React, {useState} from "react";

export default function Navbar() {
	const {logout, setCurrentMenu, currentMenu, username, loading} = useAuth();
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State to handle mobile menu
	const setActive = (item: string) => {
		// setActiveItem(item);
		setCurrentMenu(item);
	};

	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
				<Loader visible={loading}/>
				<div className="flex-1 md:flex-none flex justify-center md:justify-start">
					<Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
						<Image src="/favicon.ico" className="h-8" alt="letter-to-santa-logo" width="30" height="100"/>
						<span
							className="self-center text-black text-1xl font-semibold whitespace-nowrap dark:text-white">Писмо до дядо Коледа</span>
					</Link>
				</div>
				<div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
					<a href="https://www.noradsanta.org/" target="_blank"> <Image src="/sleigh.png" className="sleigh" alt="sleigh"
					                                              width="100" height="100"/></a>

					<a href="#"
					   className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
					   onClick={() => logout()}> Излизане <b>({username})</b></a>

					{/* Mobile menu button */}
					<button
						onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
						className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="mobile-menu"
						aria-expanded={isMobileMenuOpen}
					>
						<span className="sr-only">Open main menu</span>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							{isMobileMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
							)}
						</svg>
					</button>
				</div>

				<div id="mega-menu" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
					<ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
						<li>
							<a href="#" onClick={() => setActive('dinner')}
							   className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${currentMenu === 'dinner' ? 'font-semibold whitespace-nowrap' : ''}`}>Идеи за вечеря</a>
						</li>
						<li>
							<a href="#" onClick={() => setActive('wishes')}
							   className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${currentMenu === 'wishes' ? 'font-semibold whitespace-nowrap' : ''}`}>Моите
								желания</a>
						</li>
						<li>
							<a href="#" onClick={() => setActive('select-all')}
							   className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${currentMenu === 'select-all' ? 'font-semibold whitespace-nowrap' : ''}`}>Подари
								подаръци</a>
						</li>
						<li>
							<a href="#" onClick={() => setActive('toGive')}
							   className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${currentMenu === 'toGive' ? 'font-semibold whitespace-nowrap' : ''}`}>Избрани
								подаръци</a>
						</li>
					</ul>
				</div>

				{/* Mobile menu */}
				<div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} w-full`} id="mobile-menu">
					<ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
						<li>
							<a href="#" onClick={() => setActive('dinner')}
							   className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${currentMenu === 'dinner' ? 'font-semibold whitespace-nowrap' : ''}`}>Моите
								идеи за вечеря</a>
						</li>
						<li>
							<a href="#" onClick={() => setActive('wishes')}
							   className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${currentMenu === 'wishes' ? 'font-semibold whitespace-nowrap' : ''}`}>Моите
								желания</a>
						</li>
						<li>
							<a href="#" onClick={() => setActive('select-all')}
							   className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${currentMenu === 'select-all' ? 'font-semibold whitespace-nowrap' : ''}`}>Подари
								подаръци</a>
						</li>
						<li>
							<a href="#" onClick={() => setActive('toGive')}
							   className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${currentMenu === 'toGive' ? 'font-semibold whitespace-nowrap' : ''}`}>Избрани
								подаръци</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}