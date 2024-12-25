import React from 'react';
import SideBar from './SideBar';
import StockValueChart from './StockPlottingGraph/StockPlottingGraph';
import { useStockSubscriptionWebSocket } from './websocket/WebSocketProvider';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
    const { isOnline } = useStockSubscriptionWebSocket();
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-container">
                <aside className="sidebar">
                    <SideBar />
                </aside>
                <div className="chart">
                    <StockValueChart />
                </div>
            </div>
            <span
                className={`status-indicator ${isOnline ? 'online' : 'offline'}`}
            ></span>
            <span>You are {isOnline ? 'Online' : 'Offline'}</span>
        </div>
    );
};

export default Dashboard;
