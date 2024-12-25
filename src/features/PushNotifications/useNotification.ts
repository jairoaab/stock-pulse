const sendNotification = (message: NotificationInterface) => {
    try {
        new Notification(message.title, {
            body: message.body,
            icon: message.icon,
        });
        console.log('Notification sent successfully:');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

export interface NotificationInterface {
    title: string;
    body: string;
    icon?: string;
}

const useNotification = () => {
    return [(message: NotificationInterface) => sendNotification(message)];
}

export default useNotification;
