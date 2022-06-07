const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsMiddleware = require('./pokemons');
const { Pokemon, Type } = require('../db.js');
const { default: axios } = require('axios');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemonss',async (req,res,next) => {
    axios('https://pokeapi.co/api/v2/pokemon/?offset=00&limit=40')
        .then(r=>r.data.results)
        .then(r=>res.send(r)).catch(e=>next(e))
})

router.use('/pokemons', pokemonsMiddleware)

router.get('/types', async (req, res, next) => {
    Type.findAll()
        .then(types => {
            let result = types.map(r=>r.name)
            return res.send(result);
        })
        .catch(e=>next(e))
})

module.exports = router;
