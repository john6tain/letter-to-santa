import Card from "@/components/Card";
import {useCallback, useEffect, useState} from "react";
import BackendService from "@/services/backendService";
import {useNotification} from "@/context/NotificationContext";
import {useAuth} from "@/context/AuthContext";

interface CardProps {
	id: number;
	title: string;
	description: string;
	link: string;
}

export default function MyWishes() {
	const defaultCard: CardProps = {
		id: -1,
		title: 'Напиши име на подаръка',
		description: 'Дай малко подробности за подаръка',
		link: ''
	};

	const {notify} = useNotification();
	const [cardData, setCardData] = useState<CardProps[]>([]);
	const [isReady, setIsReady] = useState(false);
	const {setLoading} = useAuth();

	const getWishes = useCallback(async () => {
		setLoading(true);
		BackendService.get<CardProps[]>('/api/wishes/get')
			.then((wishes: CardProps[]) => {
				setCardData(wishes);
				setIsReady(true);
				setLoading(false);
			})
			.catch(error => {
				notify(error.message, 'error')
			});

	}, [setLoading, notify]);

	useEffect(() => {
		getWishes();
	}, [getWishes]);

	async function addWishes(data: CardProps) {
		BackendService.post('/api/wishes/add', data)
			.then(() => {
				getWishes();
			})
			.catch(error => notify(error.message, 'error'));
	}

	async function deleteWishes(id: number) {
		BackendService.delete(`/api/wishes/delete/${id}`)
			.then(() => {
				getWishes();
			})
			.catch(error => notify(error.message, 'error'));
	}

	function addNewCard() {
		// defaultCard.id = cardData.length + 1;
		cardData.push(JSON.parse(JSON.stringify(defaultCard)));
		setCardData([...cardData]);
	}

	function removeCard(index: number) {
		if (cardData[index] && confirm("Сигурен ли си, че искаш да изтриеш това желание")) {
			const id = cardData[index].id;
			setIsReady(false);
			deleteWishes(id);
		}
	}

	function handleChange(index: number, newTitle: string, newDescription: string, newLink: string) {
		let updatedCards: CardProps[] = [...cardData];
		if (!updatedCards.length) {
			updatedCards = [...[defaultCard]];
		}
		updatedCards[index].description = newDescription;
		updatedCards[index].title = newTitle;
		updatedCards[index].link = newLink;
		setCardData(updatedCards);
		if (updatedCards.filter(card => card.title === newTitle).length > 1) {
			return notify('Вече имаш желание с това име', 'error');
		}
		addWishes(updatedCards[index]);

	}

	return (
		<div className="flex flex-wrap overflow-x-auto">
			{isReady && cardData.length !== 0 && (cardData.map((card, index) => (
				<Card key={index} title={card.title} description={card.description} link={card.link} id={card.id}
				      handleChange={(newTitle, newDescription, newLink) => handleChange(index, newTitle, newDescription, newLink)}
				      addNewCard={addNewCard} removeCard={() => removeCard(index)}/>
			))) || isReady && [defaultCard].map((card, index) => (
				<Card key={index} title={card.title} description={card.description} link={card.link} id={card.id}
				      handleChange={(newTitle, newDescription, newLink) => handleChange(index, newTitle, newDescription, newLink)}
				      addNewCard={addNewCard} removeCard={() => removeCard(index)}/>
			))}
		</div>
	)
}