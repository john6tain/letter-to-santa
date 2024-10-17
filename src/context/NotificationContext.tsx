import React, {createContext, useContext, useState} from "react";

interface Notification {
	message: string;
	type: string;
	visible: boolean;
}

interface NotificationContextType {
	notify: (message: string, type: string) => void;
	toaster: Notification;
	closeToaster: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const [toaster, setToaster] = useState<Notification>({message: '', type: '', visible: false});

	const notify = (message: string, type: string) => {
		setToaster({message, type, visible: true});
	};

	const closeToaster = () => {
		setToaster(prev => ({...prev, visible: false}));
	};

	return (
		<NotificationContext.Provider value={{notify, toaster, closeToaster}}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error("useNotification must be used within a NotificationProvider");
	}
	return context;
};
