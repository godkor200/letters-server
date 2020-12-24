const comments = require("../../models/msg");

exports.list = async (ctx) => {
  const id = ctx.params.id;
  try {
    await comments.findById(id).exec();
  } catch {
    return ctx.throw(500, e);
  }
};

exports.create = async (ctx) => {
  const id = ctx.params.id;
  const { name, cmt } = ctx.request.body;
  console.log(
    "🚀 ~ file: comments.controller.js ~ line 15 ~ exports.create= ~ ctx.request",
    ctx.request.body
  );
  try {
    await comments.findByIdAndUpdate(id, { cmt: cmt }).exec();
  } catch {
    return ctx.throw(500, e);
  }
  ctx.body = comments;
};
exports.delete = async (ctx) => {
  const id = ctx.params.id;
  //   try {
  //     await Letter.findByIdAndRemove(id).exec();
  //   } catch (e) {
  //     return ctx.throw(500, e);
  //   }
};

// exports.replace = (ctx) => {
//   ctx.body = db.letters;
// };

exports.update = (ctx) => {
  ctx.body = db.comments;
};
