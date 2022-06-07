import React from "react";
import { Link } from "react-router-dom";
import '../styles/Card.css';

export default function Card({ name, img, type, id }) {
    return (
        <div className="cardBorder">
            <Link to={'/detailed/' + id} className="Card" key={id} style={{ textDecoration: 'none' }}>
                <div>
                    <img src={img} alt={name} className="cardImg" />
                </div>
                <div className="cardText">
                    <h3>{name}</h3>
                    {
                        type[1]
                            ? <div className="cardText"><span>{type[0]}</span>   <span>{type[1]}</span></div>
                            : <div className="cardText"><span>{type[0]}</span></div>
                    }
                </div>
            </Link>
        </div>
    )
}