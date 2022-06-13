import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from "./Card";
import '../styles/Cards.css';

export default function Cards() {
    const { filteredPokemons } = useSelector(state => state)

    useEffect(() => {
        setPokes(filteredPokemons.slice(0, 12));
        setPage(12);
    }, [filteredPokemons])

    //Paginado:
    const [page, setPage] = useState(12);
    const [pokes, setPokes] = useState([]);

    function numPage(num) {
        let result = page / 12;
        if (num === 0) return result;
        let actualPage = result + num;
        if (actualPage === 0 || ((filteredPokemons.slice(page, page + 12).length === 0 || pokes.length < 12) && num === 1)) return '-';
        return actualPage;
    }

    function next() {
        if (filteredPokemons.length !== 0) {
            if (pokes.length === 12) {
                if((filteredPokemons.slice(page, page + 12)).length === 0) return;
                setPokes(filteredPokemons.slice(page, page + 12))
                setPage(page + 12);
            }
        }
    }

    function prev() {
        if (filteredPokemons.length !== 0 && page !== 12) {
            setPokes(filteredPokemons.slice(page - 24, page - 12));
            setPage((page - 12));
        }
    }

    if (filteredPokemons.length > 0) {
        return (
            <div id='cardsMain'>
                <div id='pages'>
                    <button type='button' onClick={prev}>Prev</button>
                    <input type="button" value={numPage(-1)} onClick={prev}/>
                    <input type="button" value={numPage(0)} />
                    <input type="button" value={numPage(1)} onClick={next}/>
                    <button type='button' onClick={next}>Next</button>
                </div>
                <div className='cardsContainer'>
                    {
                        pokes.map(poke => {
                            return <Card
                                name={poke.name}
                                img={poke.img}
                                type={poke.type}
                                id={poke.id}
                                key={poke.id}
                            />
                        })
                    }
                </div>
            </div>
        )
    } else return (
        <div>
            <h2 id='loading'>Cargando...</h2>
        </div>
    )
}