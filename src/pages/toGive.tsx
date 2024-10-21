import Card from "@/components/card";
import {useCallback, useEffect, useState} from "react";
import BackendService from "@/services/backendService";
import {useNotification} from "@/context/NotificationContext";
import {useAuth} from "@/context/AuthContext";

interface CardProps {
	id: number;
	title: string;
	description: string;
	link: string;
	username?: string;
	onClick?: () => void;
}

export default function ToGive() {
	const {notify} = useNotification();
	const [cardData, setCardData] = useState<CardProps[]>([]);
	const [isReady, setIsReady] = useState(false);
	const {setLoading} = useAuth();

	const getSelectedWishes = useCallback(async () => {
		setLoading(true);
		BackendService.get<CardProps[]>('/api/wishes/selected')
			.then((wishes: CardProps[]) => {
				setCardData(wishes);
				setIsReady(true);
				setLoading(false);
			})
			.catch(error => notify(error.message, 'error'));

	}, [setLoading, notify]);

	useEffect(() => {
		getSelectedWishes();
	}, [getSelectedWishes]);

	return (
		<div className="flex flex-wrap overflow-x-auto">
			{isReady && cardData.map((card, index) => (
				<Card key={index} title={card.title} description={card.description} link={card.link}
				      username={card.username}/>
			))}
		</div>
	)
}