import axios from "axios";

function readPokemonDb(dispatch,pokeArr){
    console.log(pokeArr)
    pokeArr.forEach(poke=> dispatch({type:'READ_POKEMON', payload: poke}))
}

export function getPokemons(){
    return(dispatch)=>{
        axios('/pokemons').then(r=>console.log(r))
        axios('/types').then(r=>console.log(r))
        return  axios('/pokemons/',{ headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
          }})
                    .then(r=> {
                        if(r.data[1].length !== 0) readPokemonDb(dispatch,r.data[1]);
                        return dispatch({type: 'GET_ALL_POKEMONS',payload: r.data[0]});
            })}
}

export function readPokemon(poke_url){
    return(dispatch)=>{
        return  axios(poke_url)
                    .then(r=> {
                        let type;
                        r.data.types[1] 
                        ? type = [r.data.types[0].type.name,r.data.types[1].type.name] 
                        : type = [r.data.types[0].type.name];
                        let payload = {
                        id: r.data.id,
                        name: r.data.name,
                        attack: r.data.stats[1].base_stat,
                        img: r.data.sprites.other.dream_world.front_default,
                        type
                        }
                        dispatch({type:'READ_POKEMON',payload})
            })}
}

export function createPokemon(pokemon){
    return {
        type: 'READ_POKEMON',
        payload: pokemon
    }
}

export function getTypes(){
    return(dispatch)=>{
        return  axios('/types')
            .then(r=> {
                console.log(r.data)
                let payload = r.data;
                payload.pop()
                dispatch({type: 'GET_ALL_TYPES',payload})
            })}
}

export function cleanFilteredPokemons(){
    return {
        type: "CLEAN_FILTERED_POKEMONS",
    }
}

export function filterPokemons(payload){
    return {
        type: "FILTER_POKEMONS",
        payload
    }
}