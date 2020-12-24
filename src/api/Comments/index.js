const Router = require("koa-router");

const comments = new Router();
const commentCtrl = require("./comments.controller");

comments.get("/:id", commentCtrl.list);

comments.post("/:id", commentCtrl.create);

comments.delete("/:id", commentCtrl.delete);

//comments.put("/", commentCtrl.replace);

comments.patch("/", commentCtrl.update);

module.exports = comments;
