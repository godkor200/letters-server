const Router = require("koa-router");

const letters = new Router();
const letterCtrl = require("./letters.controller");

letters.get("/", letterCtrl.list);

letters.post("/", letterCtrl.create);

letters.delete("/", letterCtrl.delete);

letters.put("/", letterCtrl.replace);

letters.patch("/", letterCtrl.update);

module.exports = letters;
