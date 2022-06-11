import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/DetailedPokemon.css';


export default function DetailedPokemon() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [ error, setError ] = useState(false)


    useEffect(() => {
        axios('/pokemons/' + id)
            .then(r => {
                setPokemon(r.data)
            })
            .catch(()=>{
                setError(true);
            })

        return () => {setPokemon({}); setError(false)}
    }, [id])

    useEffect(()=>{
        
    },[error])

    const { name, healthpoints, attack, defense, speed, height, weight, img, type } = pokemon;

    function getId() {
        if (id.length > 10) return id.substring(0, 4) + "...";
        return id;
    }


    if(error) return (
        <div id='all'>
            <h2 id='title'>Pokémon no encontrado</h2>
            <Link to='/home'><button className='button'>volver al home.</button></Link>
        </div>
    )

    if (Object.keys(pokemon).length !== 0) return (
        <div id='all'>
            <h2 id='title'>Detalle del Pokémon:</h2>
            <div id='main'>
                <div id='info'>
                    <div id='leftInfo'>
                        <h2>{name}</h2>
                        <h4>id: {getId()}</h4>
                        <p>Ataque: {attack}</p>
                        <p>Vida: {healthpoints}</p>
                        <p>Defensa: {defense}</p>
                        <p>Velocidad: {speed}</p>
                        <p>Altura: {height}</p>
                        <p>Peso: {weight}</p> 
                    </div>
                    <div id='rightInfo'>
                        <img src={img} alt={name} id='img' />
                        {
                            type[1]
                                ? <p id='types'>{type[0]} - {type[1]}</p>
                                : <p id='types'>{type[0]}</p>
                        }
                    </div>
                </div>
                <div id='home'>
                    <Link to='/home'><button className='button'>volver al home.</button></Link>
                </div>
            </div>
        </div>
    )
    return (
        <div id='all'>
            <h2 id='title'>Cargando Pokémon...</h2>
        </div>
    )
}