const Letter = require("../../models/msg");
const Comment = require("../../models/comment");
exports.list = async (ctx) => {
  const id = ctx.params.id;
  try {
    await Letter.findById(id).exec();
  } catch {
    return ctx.throw(500, e);
  }
  ctx.body = "render";
};

exports.create = async (ctx) => {
  const { id } = ctx.params;
  const { name, cmt, createdAt } = ctx.request.body;
  const comment = new Comment();
  comment.name = name;
  comment.cmt = cmt;
  comment.createdAt = createdAt;
  try {
    await Letter.findByIdAndUpdate(id, {
      $push: { cmt: comment },
    }).exec();
  } catch {
    return ctx.throw(500);
  }
  ctx.body = Letter;
};
exports.delete = async (ctx) => {
  const { postId, cmtId } = ctx.params;
  try {
    await Letter.findByIdAndUpdate(postId, {
      $pull: { cmt: { _id: cmtId } },
    });
    await Comment.findByIdAndDelete(cmtId);
  } catch (e) {
    return ctx.throw(500, e);
  }
};

// exports.replace = (ctx) => {
//   ctx.body = db.letters;
// };

exports.update = (ctx) => {
  ctx.body = db.Letter;
};
