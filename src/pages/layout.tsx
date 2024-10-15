import React, {useState} from "react";
import Head from 'next/head';
import Toaster from "@/components/toaster";
import {useNotification} from "@/components/NotificationContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { toaster, closeToaster } = useNotification();
	return (
		<div className="bg-gradient-to-r from-red-500  to-green-500 h-screen">
			<Head>
				<title>Letter to Santa</title> {/* Set the site title here */}
				<link rel="icon" href="/favicon.ico"/>
				{/* Link to favicon */}
				<meta name="description" content="Send letter to Santa"/>
				{/* Page description */}
			</Head>
			<Toaster
				message={toaster.message}
				type={toaster.type}
				visible={toaster.visible}
				onClose={closeToaster}
			/>
			<div
				className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
					<div className="grid gap-6 mb-6 md:grid-cols-2">
						<div className="animate-feather-flutter">
							{children}
						</div>
					</div>
				</main>
			</div>

		</div>
	);
};

export default Layout;
