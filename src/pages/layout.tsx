import React from "react";
import Head from 'next/head';
import Toaster from "@/components/Toaster";
import {useNotification} from "@/context/NotificationContext";
import Navbar from "@/components/Navbar";
import {useAuth} from "@/context/AuthContext";
import SnowfallComponent from "@/components/SnowfallComponent";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const {toaster, closeToaster} = useNotification();
	const {isAuthenticated} = useAuth();
	return (
		<div className="bg-gradient-to-r from-red-500 to-green-500 min-h-screen text-white overflow-hidden">
			<Head>
				<title>Letter to Santa</title> {/* Set the site title here */}
				<link rel="icon" href="/favicon.ico"/>
				{/* Link to favicon */}
				<meta name="description" content="Send letter to Santa"/>
				{/* Page description */}
			</Head>
			<SnowfallComponent/>
			{isAuthenticated && <Navbar/>}
			<Toaster
				message={toaster.message}
				type={toaster.type}
				visible={toaster.visible}
				onClose={closeToaster}
			/>
			<div>
				{children}
			</div>


		</div>
	);
};

export default Layout;
