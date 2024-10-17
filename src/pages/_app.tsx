// src/pages/_app.tsx
import Layout from './layout';
import type {AppProps} from 'next/app';
import './globals.css';
import {NotificationProvider} from '@/context/NotificationContext';
import {AuthProvider} from "@/context/AuthContext";


function MyApp({Component, pageProps}: AppProps) {
	return (
		<NotificationProvider>
			<AuthProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</NotificationProvider>
	);
}

export default MyApp;
