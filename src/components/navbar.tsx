import {useAuth} from "@/context/AuthContext";
import {useRef, useState} from "react";

export default function Navbar() {
    const {logout} = useAuth();
    const [activeItem, setActiveItem] = useState('wishes');
    const setActive = (item) => {
        setActiveItem(item);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/favicon.ico" className="h-8" alt="letter-to-santa-logo"/>
                    <span
                        className="self-center text-black text-1xl font-semibold whitespace-nowrap dark:text-white">Писмо до дядо Коледа</span>
                </a>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <a href="https://www.noradsanta.org/"> <img src="/sleigh.png" className="sleigh" alt="sleigh"/></a>
                    <a href="#"
                       className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                       onClick={() => logout()}>Излизане</a>
                </div>

                <div id="mega-menu" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                        <li>
                            <a href="#"  onClick={() => setActive('dinner')}
                               className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${activeItem === 'dinner' ? 'font-semibold whitespace-nowrap' : ''}`}>Моите
                                идеи за вечеря</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setActive('wishes')}
                               className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${activeItem === 'wishes' ? 'font-semibold whitespace-nowrap' : ''}`}>Моите
                                желания</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setActive('toGive')}
                               className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${activeItem === 'toGive' ? 'font-semibold whitespace-nowrap' : ''}`}>Избрани
                                подаръци</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}