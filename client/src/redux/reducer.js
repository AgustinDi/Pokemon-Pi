const initialState={
    urlsPokemons: [],
    allPokemons: [],
    filteredPokemons: [],
    allTypes: [],
}

export default function reducer(state=initialState, {type, payload}){
    switch(type){
        case "GET_ALL_TYPES" :{
            return {
                ...state,
                allTypes: payload
            }
        }
        case "GET_ALL_POKEMONS" :{
            return {
                ...state,
                urlsPokemons: state.urlsPokemons.concat(payload)
            }
        }
        case "READ_POKEMON" :{
            return {
                ...state,
                allPokemons: state.allPokemons.concat(payload),
                filteredPokemons: state.filteredPokemons.concat(payload)
            }
        }
        case "FILTER_POKEMONS" :{
            return {
                ...state,
                filteredPokemons: payload
            }
        }
        case "CLEAN_FILTERED_POKEMONS" :{
            return {
                ...state,
                filteredPokemons: []    
            }
        }
        default : return state;
        }
}