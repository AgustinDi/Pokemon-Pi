import React from "react";
import linkedin from './imgs/linkedin.png';
import github from './imgs/github.png';
import henry from './imgs/henry.png';
import '../styles/Footer.css';

export default function footer() {


    return (
        <div id="footer">
            <div id='container'>
                <div id='spanContainer' className="containers">
                    <span>Creado por Agustin Di giacinto - Proyecto Individual - Henry Bootcamp </span>
                </div>
                <div id='imgsContainer' className="containers">
                    <a href="https://www.linkedin.com/in/agustin-di-giacinto-5a0357218/" target="_blank" rel="noreferrer">
                        <img src={linkedin} alt='linkedin' className="iconFooter" /></a>
                    <a href="https://github.com/AgustinDi" target="_blank" rel="noreferrer">
                        <img src={github} alt='github' className="iconFooter" /></a>
                    <a href="https://www.soyhenry.com/" target="_blank" rel="noreferrer">
                        <img src={henry} alt='henry' className="iconFooter" /></a>
                </div>
            </div>
        </div>
    )
}