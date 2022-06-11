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
  server.listen(process.env.PORT, async () => {
    try {
      //Me traigo todos los tipos de pokemons.
      const types = await axios('https://pokeapi.co/api/v2/type')
        .then(r=> r.data.results.map(x=>{return {name: x.name}}));
        if(Type.findAll().length === types.length) return;  //ver esto.
      return await Type.bulkCreate(types);
    } catch (error) {
      console.log(error)
    }
  });
});
