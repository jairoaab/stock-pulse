export const requestNotificationPermission = () => {
    console.log('Notification' in window && navigator.serviceWorker)
    if ('Notification' in window && navigator.serviceWorker) {
        if(Notification.permission === 'granted' || Notification.permission === 'denied') {
            return;
        }
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                subscribeUserToPush();
                console.log('Notification permission granted');
            } else {
                console.log('Notification permission denied');
            }
        });
    }
}

function subscribeUserToPush() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BDX3plL300HOGjQpqKk84GTydgv7OcswBPO4Eb90mlS3xbgULanUWhpFiRh-ELTZF3euNcAU1ikb0obsrhx94gA'),
            });
        })
            .then((subscription) => {
                console.log('User is subscribed:', subscription);
            })
            .catch((error) => {
                console.error('Failed to subscribe user:', error);
            });
    }
}

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
