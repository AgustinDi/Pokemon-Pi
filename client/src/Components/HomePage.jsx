import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getPokemons, getTypes, readPokemon, filterPokemons, cleanFilteredPokemons } from '../redux/actions';
import { sortAsc, sortAtt, sortDes } from "./functions";
import Cards from "./Cards";
import Card from "./Card";
import '../styles/HomePage.css';
import axios from axios;

export default function HomePage() {
    //llamada a todos los pokemons
    const { urlsPokemons, allPokemons, allTypes } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        axios('/pokemons').then(r=>{console.log(r);alert(r)})
        if (allPokemons.length === 0 && urlsPokemons.length === 0 && allTypes.length === 0) {
            dispatch(getTypes());
            dispatch(getPokemons());
        }
        if (urlsPokemons.length > 0) {
            while (urlsPokemons.length > 0) {
                dispatch(readPokemon(urlsPokemons.pop().url));
            }
        }
    })


    //Busqueda por nombre:
    const [name, setName] = useState({
        name: '',
        searched: null,
    })

    function updateName(e) { setName({ ...name, name: e.target.value }) }

    function searchByName(e) {
        e.preventDefault();
        if (name.name.length === 0) return;
        let poke = allPokemons.filter(pokemon => pokemon.name === name.name);
        poke.length === 1
            ? setName({ name: '', searched: { ...poke[0] } })
            : setName({ name: '', searched: 'not found' })
        e.target.reset();;
    }

    //reload

    function reset() {
        dispatch(cleanFilteredPokemons());
        setName({ name: '', searched: null, });
        setOrigin('all');
        setOrder('asc');
        setType('all');
        dispatch(filterPokemons(allPokemons));
    }

    //Filtros!:

    //ALL - EXISTING - CREATED
    const [origin, setOrigin] = useState('all');
    function useOrigin(e) { setOrigin(e.target.value) };

    //ASC - DES
    const [order, setOrder] = useState('asc');
    function useOrder(e) { setOrder(e.target.value) };

    //TYPE
    const [type, setType] = useState('all');
    function useType(e) { setType(e.target.value) };

    //Filtrando...
    function filter(e) {
        if (e) e.preventDefault();

        let orderr;
        order === 'asc'
            ? orderr = sortAsc
            : orderr = sortDes
        if (order === 'att') orderr = sortAtt;

        let result = allPokemons.filter(() => true); //omfg

        if (origin === 'existing') result = allPokemons.filter(poke => typeof poke.id === 'number');
        if (origin === 'created') result = allPokemons.filter(poke => typeof poke.id !== 'number');

        if (type !== 'all') result = result.filter(poke => poke.type.includes(type));

        if (result.length === 0) setName({ ...name, searched: 'not found' });

        result = result.sort(orderr);

        dispatch(filterPokemons(result));
    }


    return (
        <div>
            <div id='nav'>
                <form onSubmit={searchByName} id='searchBar'>
                    <input type="text" onChange={updateName} value={name.name} placeholder='Buscar Pokemon' id='searchInput'/>
                    <input type='submit' value='Buscar' className="button" />
                </form>
                {
                    name.searched !== null
                        ? <div className='filterBar'><input type='button' onClick={reset} value='Reset' className="button" /></div>
                        : <form onSubmit={filter} className='filterBar' id="formFilterInputs">
                            <select name="color" onChange={useOrigin} className='heightInputs'>
                                <option value="all">Todos</option>
                                <option value="existing">Existentes</option>
                                <option value="created">Creados</option>
                            </select>
                            <select name="color" onChange={useOrder} className='heightInputs'>
                                <option value="asc">Ascendente</option>
                                <option value="des">Descendente</option>
                                <option value="att">Fuerza</option>
                            </select>
                            <select name="type" onChange={useType} className='heightInputs'>
                                <option value='all'>Tipo</option>
                                {allTypes.map(type => {
                                    return <option key={type} value={type}>{type}</option>
                                })}
                            </select>
                            <input type='submit' value='Filtrar' className="button" />
                        </form>
                }
                <div id="createBar">
                    <Link to='/create' onClick={reset}><button id='createButton' className="button">Crea Tu Pokemon!</button></Link>
                </div>
            </div>
            <div className="cardsContainer">
                {
                    name.searched === 'not found'
                        ? <div id='notFound'><h2>Pokemon no encontrado</h2></div>
                        : name.searched !== null
                            ? <div className='fixHeight'><Card
                                name={name.searched.name}
                                img={name.searched.img}
                                type={name.searched.type}
                                id={name.searched.id}
                                key={name.searched.id}
                            /></div>
                            : <Cards />
                }
            </div>
        </div>
    )
}