const Router = require("koa-router");
const letters = require("./Letters/index");
const comments = require("./Comments/index");

const api = new Router();

api.use("/comments", comments.routes());
api.use("/letters", letters.routes());

module.exports = api;
