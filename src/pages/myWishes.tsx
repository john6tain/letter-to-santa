import Card from "@/components/card";
import {useEffect, useState} from "react";
import BackendService from "@/services/backendService";
import {useNotification} from "@/context/NotificationContext";

export default function MyWishes() {
	const defaultCard = {
		id: 0,
		title: 'Напиши име на подаръка',
		description: 'Дай малко подробности за подаръка',
		link: ''
	};

	const {notify} = useNotification();
	const [cardData, setCardData] = useState([defaultCard]);

	async function getWishes() {
		BackendService.get('/api/wishes/get')
			.then(response => response.json())
			.then(wishes => {
				setCardData(wishes);
			})
			.catch(error => notify(error.message, 'error'));
	}

	useEffect(() => {
		getWishes();
	}, []);

	async function addWishes(data: any) {
		BackendService.post('/api/wishes/add', data).then(response => response.json())
			.then(wishes => {
				getWishes();
			})
			.catch(error => notify(error.message, 'error'));
	}


	function addNewCard() {
		defaultCard.id = cardData.length + 1;
		setCardData([...cardData, defaultCard]);
	}

	function handleChange(index: number, newTitle: string, newDescription: string, newLink: string) {
		const updatedCards = [...cardData];
		updatedCards[index].description = newDescription;
		updatedCards[index].title = newTitle;
		updatedCards[index].link = newLink;
		addWishes(updatedCards[index]);
		setCardData(updatedCards);
	}

	return (
		<div className="flex flex-wrap overflow-x-auto">
			{cardData.map((card, index) => (
				<Card key={index} title={card.title} description={card.description} link={card.link}
							handleChange={(newTitle, newDescription, newLink) => handleChange(index, newTitle, newDescription, newLink)}
							addNewCard={addNewCard}/>
			))}
		</div>
	)
}