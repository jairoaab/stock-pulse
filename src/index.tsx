import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import App from './App';
import './index.css';
import { WebSocketProvider } from './features/websocket/WebSocketProvider';

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);

    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <WebSocketProvider>
                    <App />
                </WebSocketProvider>
            </PersistGate>
        </Provider>
    );
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    );
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/notifications-service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}
