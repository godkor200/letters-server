const Router = require("koa-router");
const letters = require("./Letters/index");

const api = new Router();

api.use("/letters", letters.routes());

module.exports = api;
