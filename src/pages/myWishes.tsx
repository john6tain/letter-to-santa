import Card from "@/components/card";
import {useState} from "react";

export default function MyWishes() {
    const defaultCard = {
        id: 0,
        title: 'Напиши име на подаръка',
        description: 'Дай малко подробности за подаръка',
        link: ''
    };
    const [cardData, setCardData] = useState([defaultCard]);

    function addNewCard() {
        defaultCard.id = cardData.length + 1;
        setCardData([...cardData, defaultCard]);
    }

    function handleChange(index: number, newTitle: string, newDescription: string, newLink: string) {
        const updatedCards = [...cardData];
        console.log(index, newTitle, newDescription)
        updatedCards[index].description = newDescription;
        updatedCards[index].title = newTitle;
        updatedCards[index].link = newLink;
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