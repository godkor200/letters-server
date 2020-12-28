const Letter = require("../../models/msg");
const Comment = require("../../models/comment");
exports.list = async (ctx) => {
  const id = ctx.params.id;
  try {
    await Letter.findById(id).exec();
  } catch {
    return ctx.throw(500, e);
  }
};

exports.create = async (ctx) => {
  const { id } = ctx.params;
  const { cmt, createdAt } = ctx.request.body;
  const comment = new Comment();
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
  console.log(
    "🚀 ~ file: comments.controller.js ~ line 29 ~ exports.delete ~ id",
    postId,
    cmtId
  );
  try {
    const post = await Letter.findByIdAndUpdate(postId, {
      $pull: { cmt: cmtId },
    });
    console.log(
      "🚀 ~ file: comments.controller.js ~ line 38 ~ exports.delete ~ post",
      post
    );
    await Comment.findByIdAndDelete(cmtId);
    if (!post) {
      return ctx.throw(400).send("Post not found");
    }
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
