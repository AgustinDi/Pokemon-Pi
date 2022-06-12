import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getTypes, getPokemons } from '../redux/actions';
import axios from 'axios';
import { onlyLowCaseLetters, isUrl } from './functions';
import '../styles/CreatePokemon.css';


export default function CreatePokemon() {
    const { allTypes, allPokemons } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes())
        if (allPokemons.length === 0) {
            dispatch(getPokemons());
        }
    }, [dispatch, allPokemons])

    const initialData = {
        attack: '50',
        healthpoints: '50',
        defense: '50',
        speed: '50',
        height: '50',
        weight: '50',
    }
    const initialType = {
        type1: '...',
        type2: '...',
        good: true
    }

    //Local States:
    const [data, setData] = useState(initialData);
    const [name, setName] = useState({ name: '', good: true });
    const [img, setImg] = useState({ img: '', good: true });
    const [type, setType] = useState(initialType);
    const [sended, setSended] = useState(false)

    //Update Functions:
    function update(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    function updateType(e) {
        if (e.target.value === '...') {
            if (type.type1 === '...' && e.target.name === 'type2') {
                return setType({
                    ...type,
                    [e.target.name]: e.target.value,
                    good: false
                })
            }
            else if (type.type2 === '...' && e.target.name === 'type1') {
                return setType({
                    ...type,
                    [e.target.name]: e.target.value,
                    good: false
                })
            }
        }
        setType({
            ...type,
            [e.target.name]: e.target.value,
            good: true
        })
    }

    function updateName(e) {
        let value = e.target.value;
        if (value.length === 0 || value.includes(' ') || !onlyLowCaseLetters(value) || value.length > 12) return setName({ name: value, good: false });
        setName({ name: value, good: true })
    }
    function updateImg(e) {
        let value = e.target.value;
        if (value.length === 0 || !isUrl(value)) return setImg({ img: value, good: false });
        setImg({ img: value, good: true })
    }

    // verificar que todo este correcto y submit:
    function submit(event) {
        event.preventDefault();
        let error = false;
        if (name.name.length === 0 || !name.good) { setName({ ...name, good: false }); error = true }
        if (img.img.length === 0 || !img.good) { setImg({ ...img, good: false }); error = true }
        if (type.type1 === '...' && type.type2 === '...') { setType({ ...type, good: false }); error = true }

        if (error) return;


        let newPokemon = {
            ...data,
            name: name.name,
        };

        if(img.img.length !== 0) newPokemon.img = img.img;

        newPokemon.type = [];
        if (type.type1 === type.type2) {
            newPokemon.type.push(type.type1);
        } else {
            if (type.type1 !== '...') newPokemon.type[0] = type.type1;
            if (type.type2 !== '...') newPokemon.type.push(type.type2);
        }
        axios.post('/pokemons/', newPokemon)
            .then(r => {
                newPokemon.id = r.data.id;
                dispatch(createPokemon(newPokemon))
                setSended(true)
            })
            .catch(r=>console.log(r))
    }

    //Reset all local states
    function reload() {
        setData(initialData);
        setType(initialType);
        setName({ name: '', good: true });
        setImg({ img: '', good: true });
        setSended(false);
    }

    if (sended) return (
        <div id='fixCreate'>
            <h2 className='title lessMargin'>Pokemon creado con exito</h2>
            <div>
                <Link to='/home'><button className='button'>volver al home.</button></Link>
                <button onClick={reload} className='button'>crear otro pokemon.</button>
            </div>
        </div>
    )
    return (
        <div id='fixCreate'>
            <h2 className='title'>Crea tu Pokemon!!</h2>
            <div id='createPokemon'>
                <form onSubmit={submit} id="formRange">
                    {/* type range: */}
                    <div >
                        <div>
                            <p>Ataque:</p>
                            <input
                                type='range'
                                name='attack'
                                min='5'
                                max='200'
                                onChange={update}
                            /><span>{data.attack}</span>
                        </div>
                        <div>
                            <p>Vida:</p>
                            <input
                                type='range'
                                name='healthpoints'
                                min='1'
                                max='300'
                                onChange={update}
                            /><span>{data.healthpoints}</span>
                        </div>
                        <div>
                            <p>Defensa:</p>
                            <input
                                type='range'
                                name='defense'
                                min='5'
                                max='300'
                                onChange={update}
                            /><span>{data.defense}</span>
                        </div>
                        <div>
                            <p>Velocidad:</p>
                            <input
                                type='range'
                                name='speed'
                                min='5'
                                max='200'
                                onChange={update}
                            /><span>{data.speed}</span>
                        </div>
                        <div>
                            <p>Altura:</p>
                            <input
                                type='range'
                                name='height'
                                min='1'
                                max='100'
                                onChange={update}
                            /><span>{data.height}</span>
                        </div>
                        <div>
                            <p>Peso:</p>
                            <input
                                type='range'
                                name='weight'
                                min='1'
                                max='200'
                                onChange={update}
                            /><span>{data.weight}</span>
                        </div>
                    
                    {/* Type */}
                    <div>
                        <p>Tipo:</p>
                        <select name="type1" onChange={updateType} className='inputType'>
                            <option>...</option>
                            {allTypes.map(type => {
                                return <option key={type}>{type}</option>
                            })}
                        </select>
                        <select name="type2" onChange={updateType} className='inputType'>
                            <option>...</option>
                            {allTypes.map(type => {
                                return <option key={type}>{type}</option>
                            })}
                        </select>
                    </div>
                    {
                        type.good
                            ? null
                            : <p className='incomplete'>• Debes seleccionar minimo un tipo</p>
                    }
                    {/* Name, Imagen y Submit */}
                    <div>
                        <p>Nombre:</p>
                        <input
                            type='text'
                            name='name'
                            placeholder='Nombre...'
                            onChange={updateName}
                            className='inputText'
                        />
                    </div>
                    {
                        name.good
                            ? null
                            : <p className='incomplete'>• No se permiten numeros, espacios o caracteres especiales, maximo 12 carac.</p>
                    }
                    <div>
                        <p>Sprite:</p>
                        <input
                            type='url'
                            name='img'
                            placeholder='URL-Sprite...'
                            onChange={updateImg}
                            className='inputText'
                        />
                    </div>
                    {
                        !img.good
                            ? <p className='incomplete'>• La imagen debe ser una URL valida</p>
                            : null
                    }
                    </div>
                    <div id='lastButtons'>
                        <Link to='/home'><button className='button'>volver al home.</button></Link>
                        <button type='submit' className='button'>Crear Pokemon!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}