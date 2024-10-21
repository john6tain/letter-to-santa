import React from "react";
import Head from 'next/head';
import Toaster from "@/components/toaster";
import {useNotification} from "@/context/NotificationContext";
import Navbar from "@/components/navbar";
import {useAuth} from "@/context/AuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const {toaster, closeToaster} = useNotification();
	const {isAuthenticated} = useAuth();
	return (
		<div className="bg-gradient-to-r from-red-500  to-green-500 h-screen text-white">
			<Head>
				<title>Letter to Santa</title> {/* Set the site title here */}
				<link rel="icon" href="/favicon.ico"/>
				{/* Link to favicon */}
				<meta name="description" content="Send letter to Santa"/>
				{/* Page description */}
			</Head>
			{isAuthenticated && <Navbar/>}
			<Toaster
				message={toaster.message}
				type={toaster.type}
				visible={toaster.visible}
				onClose={closeToaster}
			/>

			<div className="animate-feather-flutter">
				{children}
			</div>


		</div>
	);
};

export default Layout;
