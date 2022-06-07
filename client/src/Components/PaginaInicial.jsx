import React from 'react';
import { Link } from 'react-router-dom';
import img from './imgs/pokemon.png';
import mainTitle from './imgs/mainTitle.png';
import '../styles/PaginaInicial.css';

export default function PaginaInicial (){
    
    return (
        <div id='inicio'>
            <div id='inicioFix'>
        <div id='contenedorInicial'>
                <div>
                    <img src={mainTitle} alt='mainTitle' width='500px'/>
                    <div id='contenedorEntrar'>
                    <Link to='/home'><button id='entrar'>Entrar!</button></Link>
                    </div>
                </div>
                <img src={img} alt='poke' width='360px'/>
        </div>
            </div>
        </div>
    )
}