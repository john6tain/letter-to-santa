import Card from "@/components/Card";
import {useCallback, useEffect, useMemo, useState} from "react";
import BackendService from "@/services/backendService";
import {useNotification} from "@/context/NotificationContext";
import {useAuth} from "@/context/AuthContext";

interface CardProps {
	id: number;
	title: string;
	description: string;
	link: string;
	username?: string;
	enableEdit?: boolean;
}

export default function MyDinner() {
	const defaultCard: CardProps = useMemo(() => ({
		id: 0,
		title: 'Напиши име на рецепта',
		description: 'Пълна рецепта със стъпки',
		link: '',
	}), []);

	const {notify} = useNotification();
	const [cardData, setCardData] = useState<CardProps[]>([]);
	const [isReady, setIsReady] = useState(false);
	const {setLoading} = useAuth();

	const getDinners = useCallback(async (withoutReady?: boolean) => {
		setLoading(true);
		if (!withoutReady) {
			setIsReady(false);
		}
		BackendService.get<CardProps[]>('/api/dinner/all')
			.then((dinners: CardProps[]) => {
				if (!dinners.some(dinner => dinner.enableEdit)) {
					dinners.push(JSON.parse(JSON.stringify(defaultCard)));
				}
				setCardData(dinners);
				setIsReady(true);
				setLoading(false);
			})
			.catch(error => {
				notify(error.message, 'error')
			});

	}, [setLoading, notify, defaultCard]);

	useEffect(() => {
		getDinners();
	}, [getDinners]);

	async function addDinners(data: CardProps) {
		BackendService.post('/api/dinner/add', data)
			.then(() => {
				getDinners(true);
			})
			.catch(error => notify(error.message, 'error'));
	}

	async function deleteDinners(id: number) {
		BackendService.delete(`/api/dinner/delete/${id}`)
			.then(() => {
				getDinners();
			})
			.catch(error => notify(error.message, 'error'));
	}

	function addNewCard() {
		// defaultCard.id = cardData.length + 1;
		cardData.push(JSON.parse(JSON.stringify(defaultCard)));
		setCardData([...cardData]);
	}

	function removeCard(index: number) {
		if (cardData[index] && confirm("Сигурен ли си, че искаш да изтриеш тази идея ")) {
			const id = cardData[index].id;
			setIsReady(false);
			deleteDinners(id);
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
		addDinners(updatedCards[index]);

	}

	return (
		<div className="flex flex-wrap overflow-x-auto">
			{isReady && cardData.length !== 0 && (cardData.map((card, index) => (
				<Card key={index} title={card.title} description={card.description} link={card.link}
							username={!card.enableEdit && card.username || ''}
							handleChange={(newTitle, newDescription, newLink) => handleChange(index, newTitle, newDescription, newLink)}
							addNewCard={addNewCard} removeCard={() => removeCard(index)}/>
			))) || isReady && [defaultCard].map((card, index) => (
				<Card key={index} title={card.title} description={card.description} link={card.link}
							handleChange={(newTitle, newDescription, newLink) => handleChange(index, newTitle, newDescription, newLink)}
							addNewCard={addNewCard} removeCard={() => removeCard(index)}/>
			))}
		</div>
	)
}