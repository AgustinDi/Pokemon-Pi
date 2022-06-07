import React from "react";
import { useLocation } from "react-router-dom";
import mainTitle from './imgs/mainTitle.png';
import { Link } from "react-router-dom";
import '../styles/TopNav.css';

export default function TopNav(){
    const location = useLocation();
    let border;
    location.pathname !== '/home' ? border = 'border' : border = 'none'
    return (
        <div id='topNav' className={`${border}`}>
            <Link to='/home'>
                <img src={mainTitle} alt='mainTitle' id='mainTitle'/>
            </Link>
        </div>
    )
}