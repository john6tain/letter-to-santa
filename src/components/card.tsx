import {useEffect, useRef, useState} from "react";

interface CardProps {
    title: string;
    description: string;
    link: string;
    handleChange?: (newTitle: string, newDescription: string, newLink: string) => void;
    addNewCard?: () => void;
    removeCard?: () => void;
}

export default function Card({title, description, link, handleChange, addNewCard, removeCard}: CardProps) {
    const [isEditable, setIsEditable] = useState(false);
    const [isTitleEditable, setIsTitleEditable] = useState(false);
    const [isLinkEditable, setIsLinkEditable] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newLink, setLink] = useState(link);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (textAreaRef.current && !textAreaRef.current.contains(event.target as Node)) {
                setIsEditable(false);
                setIsTitleEditable(false);
                setIsLinkEditable(false);
                if (handleChange) {
                    handleChange(newTitle, newDescription, newLink);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [newTitle, newDescription, newLink]);

    return (
        <a href="#"
           className="relative mr-2 ml-2 mt-2 mb-2 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    {!isTitleEditable && (
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                            onClick={() => setIsTitleEditable(true)}>
                            {newTitle}
                        </h5>
                    )}
                    {isTitleEditable && (
                        <textarea
                            id="title"
                            rows={1}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            ref={textAreaRef}
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        ></textarea>
                    )}
                    {!isEditable && (
                        <div className="font-normal text-gray-700 dark:text-gray-400"
                             onClick={() => setIsEditable(true)}>
                            {newDescription}
                        </div>
                    )}
                    {isEditable && (
                        <textarea
                            id="description"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            ref={textAreaRef}
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        ></textarea>
                    )}
                    {!isEditable && (
                        <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                             onClick={() => setIsLinkEditable(true)}
                             onDoubleClick={() => window.open(newLink, "_blank")}>
                            Link
                        </div>
                    )}
                    {isLinkEditable && (
                        <textarea
                            id="link"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            ref={textAreaRef}
                            value={newLink}
                            onChange={(e) => setLink(e.target.value)}
                        ></textarea>
                    )}
                </div>

                <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     onClick={addNewCard}>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>

                <svg
                    className="absolute top-2 right-2 h-5 w-5 text-red-500 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor" onClick={removeCard}>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </div>
        </a>
    )
}