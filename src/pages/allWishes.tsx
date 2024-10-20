import Card from "@/components/card";
import {useCallback, useEffect, useState} from "react";
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

export default function AllWishes() {
    const {notify} = useNotification();
    const [cardData, setCardData] = useState<CardProps[]>([]);
    const [isReady, setIsReady] = useState(false);


    const getWishes = useCallback(async () => {
        BackendService.get<CardProps[]>('/api/wishes/all')
          .then((wishes: CardProps[]) => {
              setCardData(wishes);
              setIsReady(true);
          })
          .catch(error => notify(error.message, 'error'));
    }, [ notify]);

    useEffect(() => {
        getWishes();
    }, [getWishes]);

    function selectToGive(card : CardProps){
        BackendService.post('/api/wishes/select',{title: card.title, wishId: card.id})
          .then(() => {
              notify(`Ти избра да подариш\n ${card.title}\n на ${card.username}`, 'success')
          })
          .catch(error => notify(error.message, 'error'));
    }

    return (
        <div className="flex flex-wrap overflow-x-auto">
            {isReady && cardData.map((card, index) => (
                <Card key={index} title={card.title} description={card.description} link={card.link} username={card.username} onClick={() => selectToGive(card)}/>
            ))}
        </div>
    )
}