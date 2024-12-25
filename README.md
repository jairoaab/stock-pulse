# Stock Monitoring PWA

A Progressive Web Application (PWA) designed for real-time stock monitoring and price alerts. This app allows users to subscribe to stock symbols, monitor their prices, and receive notifications when thresholds are reached. The app also works offline, ensuring a seamless user experience.

## Key Features

- **Real-Time Updates**: Utilizes WebSocket for real-time stock price updates.
- **Offline Support**: Service workers cache essential data for offline functionality.
- **Push Notifications**: Alerts users when stock prices meet predefined conditions.
- **Responsive Design**: Adapts to various screen sizes, ensuring usability on mobile and desktop devices.
- **PWA Functionality**: Installable on devices, providing an app-like experience.

## Technologies Used

- **Frontend**: React with TypeScript.
- **State Management**: Redux Toolkit.
- **Real-Time Communication**: WebSocket.
- **Offline Support**: Service Workers and LocalStorage.
- **Styling**: SCSS.
- **API Integration**: Finnhub API for stock data.

## Project Architecture

### Components

1. **WebSocketProvider**
    - Manages the WebSocket connection.
    - Provides methods to subscribe/unsubscribe to stock symbols.
    - Handles reconnection and updates Redux state with stock data.

2. **StockSlice (Redux)**
    - Manages stock subscriptions and their data in the global state.

3. **Service Worker**
    - Caches essential files and handles offline data sync.
    - Fetches stock prices and currencies when online.

4. **Push Notifications**
    - Sends alerts for stock price thresholds.

5. **UI Components**
    - **Dashboard**: Displays stock charts and subscription details.
    - **PriceAlertForm**: Allows users to set price alerts.
    - **StockSubscriptions**: Displays subscribed stocks and their real-time data.

### Folder Structure

```
src/
├── features/
│   ├── Dashboard.tsx
│   ├── StockPlottingGraph/
│   ├── websocket/
│   ├── PushNotifications/
│   ├── Stock/
│   ├── PriceAlertForm/
│   ├── StockSubscriptions/
│   ├── SideBar.tsx/
├── app/
│   ├── store.ts
├── styles/
├── serviceWorker.js
├── manifest.json
```

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:jairoaab/stock-pulse.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build the project for production:
   ```bash
   npm run build
   ```

5. Deploy the app using a static server with HTTPS to enable PWA features.

## How It Works

1. **WebSocket Connection**: Opens a WebSocket connection to fetch live stock data.
2. **Service Worker**: Caches static assets and handles background synchronization.
3. **Redux State Management**: Stores subscriptions and updates real-time stock data.
4. **LocalStorage**: Persists stock data for offline access.
5. **Push Notifications**: Notifies users when a stock meets the alert criteria.

## PWA Features

- **Manifest File**: Configures app name, icons, and theme colors for installability.
- **Service Worker**: Enables offline caching and background sync.
- **Install Prompt**: Allows users to install the app on their devices.

## Usage

1. Add a stock to monitor by searching for its symbol.
2. Set a price threshold for alerts.
3. Monitor real-time stock data on the dashboard.
4. Receive notifications when thresholds are met.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

