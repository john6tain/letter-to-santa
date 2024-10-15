// src/pages/_app.tsx
import Layout from './layout';
import type {AppProps} from 'next/app';
import './globals.css';
import { NotificationProvider } from '@/components/NotificationContext';


function MyApp({Component, pageProps}: AppProps) {
	return (
		<NotificationProvider>
			<Layout>
			<Component {...pageProps} />
			</Layout>
		</NotificationProvider>
	);
}

export default MyApp;
