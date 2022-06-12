const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsMiddleware = require('./pokemons');
const { Pokemon, Type } = require('../db.js');
const { default: axios } = require('axios');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/',async (req,res,next) => {
    let result = 'did it';
    console.log(result)
    res.send(result);
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
