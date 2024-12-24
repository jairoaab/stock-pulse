import React from 'react';
import PriceAlertForm from './PriceAlertForm/PriceAlertForm';

import './SideBar.scss';

const SideBar = () => {
    return (
        <div className="subscription-sidebar">
            <h2>Subscribe to Stock</h2>
            <PriceAlertForm className="subscription-form" />
        </div>
    );
};

export default SideBar;
