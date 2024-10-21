import Card from "@/components/card";
import {useEffect, useState} from "react";
import BackendService from "@/services/backendService";
import {useNotification} from "@/context/NotificationContext";

interface CardProps {
	id: number;
	title: string;
	description: string;
	link: string;
	username?: string;
	onClick?: ()=> void;
}

export default function ToGive() {
	const {notify} = useNotification();
	const [cardData, setCardData] = useState<CardProps[]>([]);
	const [isReady, setIsReady] = useState(false);

	async function getSelectedWishes() {
		BackendService.get<CardProps[]>('/api/wishes/selected')
			.then((wishes: CardProps[]) => {
				setCardData(wishes);
				setIsReady(true);
			})
			.catch(error => notify(error.message, 'error'));
	}

	useEffect(() => {
		getSelectedWishes();
	});


	return (
		<div className="flex flex-wrap overflow-x-auto">
			{isReady && cardData.map((card, index) => (
				<Card key={index} title={card.title} description={card.description} link={card.link} username={card.username}/>
			))}
		</div>
	)
}