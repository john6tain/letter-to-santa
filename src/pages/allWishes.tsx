import Card from "@/components/card";
import {useEffect, useState} from "react";
import BackendService from "@/services/backendService";
import {useNotification} from "@/context/NotificationContext";

interface CardProps {
    id: number;
    title: string;
    description: string;
    link: string;
}

export default function AllWishes() {
    const {notify} = useNotification();
    const [cardData, setCardData] = useState<CardProps[]>([]);
    const [isReady, setIsReady] = useState(false);

    async function getWishes() {
        BackendService.get('/api/wishes/all')
            .then(response => response.json())
            .then(wishes => {
                setCardData(wishes);
                setIsReady(true);
            })
            .catch(error => notify(error.message, 'error'));
    }

    useEffect(() => {
        getWishes();
    }, []);

    return (
        <div className="flex flex-wrap overflow-x-auto">
            {isReady && cardData.map((card, index) => (
                <Card key={index} title={card.title} description={card.description} link={card.link}/>
            ))}
        </div>
    )
}