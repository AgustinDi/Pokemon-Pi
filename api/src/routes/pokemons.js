const { Router } = require("express");
const axios = require("axios")
const { Pokemon, Type } = require('../db.js');
let router = Router();



router.get('/', async (req, res, next) => {
    const { name } = req.query;
    Pokemon.findOne({where:{name: name},include: Type}).then(poke=>{
        let types;
        poke.dataValues.types[1] ? types = [poke.dataValues.types[0].dataValues.name,poke.dataValues.types[1].dataValues.name]:types = [poke.dataValues.types[0]];
        return {
            ...poke.dataValues,
            types
            }
    }).then(r=>res.send(r),
        ()=>{ //Si hay un error, o sea, no se encuentra se busca el nombre en la api.
            if(!name) return next();
            axios("https://pokeapi.co/api/v2/pokemon/" + name)
            .then(r=>{
                let type = [r.data.types[0].type.name];
                r.data.types[1] ? type.push(r.data.types[1].type.name) : null;
                res.send({
                    id: r.data.id,
                    name: r.data.name,
                    healthpoints: r.data.stats[0].base_stat,
                    attack: r.data.stats[1].base_stat,
                    defense: r.data.stats[2].base_stat,
                    speed: r.data.stats[5].base_stat,
                    height: r.data.height,
                    weight: r.data.weight,
                    img: r.data.sprites.other.dream_world.front_default,
                    type
                })},
        (e)=>next(e));//res.status(404).send('Error, el parametro enviado es inválido.'));
    });
})

router.get('/', async (req, res, next) => {
    let resultApi = await axios('https://pokeapi.co/api/v2/pokemon/?offset=00&limit=100')
        .then(r=> r.data.results)

    let resultDb = await Pokemon.findAll({include: Type}).then(pokes=> {return pokes.map(poke => {
        let { id, name, img, types, attack} = poke.dataValues;
        types[1] ? types[1] = poke.dataValues.types[1].dataValues.name : null;
        types[0] = poke.dataValues.types[0].dataValues.name;
        return{
            id,
            name,
            img,
            attack,
            type: types
        }
    })});
    res.send([resultApi,resultDb]);

    //ANTES LO RESOLVIA ASI, ESPERANDO A QUE TODOS SE COMPLETEN EN EL BACKEND, DECIDI CAMBIARLO PORQUE LLEGABA A ESPERAR 1MIN 
    //HASTA QUE ME LLEGABAN TODOS LOS POKEMONS COMO LOS NECESITABA.
    //LLAMANDO DESDE EL FRONTEND EL DIBUJO ES MUCHO MAS RAPIDO.

    // try{    
    // const pokemons1 = await getPokemonsByAPI(url1);
    // const pokemons2 = await getPokemonsByAPI(url2);
    // let result = pokemons1.concat(pokemons2);
    // await Pokemon.findAll({include: Type}).then(pokes=> pokes.forEach(poke => {
    //     let { id, name, img, types} = poke.dataValues;
    //     types[1] ? types[1] = poke.dataValues.types[1].dataValues.name : null;
    //     types[0] = poke.dataValues.types[0].dataValues.name;
    //     result.push({
    //         id,
    //         name,
    //         img,
    //         types
    //     })
    // }));
    // Promise.all(result).then(r=> res.json(r));
    // }catch(e){
    //     next(e);
    // }

    //-----------FUNCTIONS Y URLS---------------//

    // let url1 = 'https://pokeapi.co/api/v2/pokemon/?offset=00&limit=20';
    // let url2 = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20';

    // async function getPokemonsByAPI (url){
    //     let pokemons = await axios(url)
    //     .then(r=> r.data.results).catch(e=>console.log(e))

    //     let result = pokemons.map(poke => {
    //     return axios(poke.url)
    //             .then(r=> {
    //         let type = [r.data.types[0].type.name];
    //         r.data.types[1] ? type.push(r.data.types[1].type.name) : null;
    //         return {
    //         id: r.data.id,
    //         name: poke.name,
    //         img: r.data.sprites.front_default,
    //         type
    //         }
    //     },error=>{
    //         return undefined;
    //     })})
    //     return Promise.all(result);
    // }
})

router.get('/:idPokemon', async (req, res, next) => {
    try {
        const { idPokemon } = req.params;
        if(idPokemon.length == 36){
            Pokemon.findByPk(idPokemon,{include: Type}).then(poke=>{
                let type;
                poke.dataValues.types[1] ? type = [poke.dataValues.types[0].dataValues.name,poke.dataValues.types[1].dataValues.name]:type = [poke.dataValues.types[0].dataValues.name];
                let result = {
                    ...poke.dataValues,
                    type
                    }
                delete result.types;
                return result;
            }).then(r=>res.send(r));
        } else if(parseInt(idPokemon, 10)){
            axios("https://pokeapi.co/api/v2/pokemon/" + idPokemon)
                .then(r=>{
                    let type = [r.data.types[0].type.name];
                    r.data.types[1] ? type.push(r.data.types[1].type.name) : null;
                    res.send({
                        id: idPokemon,
                        name: r.data.name,
                        healthpoints: r.data.stats[0].base_stat,
                        attack: r.data.stats[1].base_stat,
                        defense: r.data.stats[2].base_stat,
                        speed: r.data.stats[5].base_stat,
                        height: r.data.height,
                        weight: r.data.weight,
                        img: r.data.sprites.other.dream_world.front_default,
                        type
                    })},e=> res.status(404).send(e.message));
        } else {
            res.status(404).send('Error, el parametro enviado es inválido.')
        }
    } catch (e) {
        next(e);
    }
})

router.post('/', async (req, res, next) => {
    try{
        const { name, healthpoints, attack, defense, speed, height, weight, img, type } = req.body;
        if(!name||!healthpoints||!attack||!defense||!speed||!height||!weight||!img||!type) return next(new Error('ERROR: Faltan datos para crear el pokemon'));
        
        let newPoke = await Pokemon.create({...req.body, iduser: true});
    
        if(type[1]) type[1] = await Type.findOne({where:{name: type[1]}});
        type[0] = await Type.findOne({where:{name: type[0]}});
    
        await newPoke.setTypes(type);

        res.send({msg: `Pokemon creado con éxito`,id: newPoke.dataValues.id });
    } catch(e){
        next(e)
    }
})

module.exports = router;