//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { Type, conn } = require('./src/db.js');
const axios = require('axios');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    //PRUEBAS INICIALES:

    try {
      //Me traigo todos los tipos de pokemons.
      const types = await axios('https://pokeapi.co/api/v2/type')
        .then(r=> r.data.results.map(x=>{return {name: x.name}}));
      
      //Subo los tipos a la bd.
      await Type.bulkCreate(types);
  
      console.log('finished')
      
    } catch (error) {
      console.log(error)
    }

  });
});


// conn.sync({ force: true }).then(() => {
//   server.listen(process.env.PORT ? process.env.PORT : 3001, async () => {
//     try {
//       //Me traigo todos los tipos de pokemons.
//       const types = await axios('https://pokeapi.co/api/v2/type')
//         .then(r=> r.data.results.map(x=>{return {name: x.name}}));
//         if(Type.findAll().length === types.length) return;  //ver esto.
//       return await Type.bulkCreate(types);
//     } catch (error) {
//       console.log(error)
//     }
//   });
// });
