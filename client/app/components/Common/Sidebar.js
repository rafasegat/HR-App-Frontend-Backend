import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => (
    <div className="sidebar">
        <div className="sidebar-core">
            <ul className="sidebar-menu">
                <li>
                    <Link to={'participants'} >Participants</Link>
                </li>
                <li>
                    <Link to={'provider-customers'} >Provider Customers</Link>
                </li>
            </ul>
        </div>
    </div>
);

export default Sidebar;
