const Router = require('koa-router');

const letters = new Router();
const letterCtrl = require('./letters.controller');

letters.get('/', letterCtrl.list);

letters.post('/', letterCtrl.create);

letters.delete('/:id', letterCtrl.delete);

letters.put('/:id', letterCtrl.replace);

//letters.patch('/:id', letterCtrl.update);

module.exports = letters;
