import React from 'react';
import SideBar from './SideBar';
import StockValueChart from './StockPlottingGraph/StockPlottingGraph';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
        <div style={{ display: "flex", flexDirection: 'row' }}>
            <aside>
                <SideBar />
            </aside>
            <div style={{ width: '79vw' }}>
                <StockValueChart/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
