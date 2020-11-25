const Letter = require("../../models/msg");

exports.list = async (ctx) => {
  let letters;
  try {
    letters = await Letter.find().exec();
    console.log(
      "🚀 ~ file: letters.controller.js ~ line 7 ~ exports.list= ~ letters",
      letters
    );
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = letters;
};

exports.create = async (ctx) => {
  const msg = ctx.request.body;
  const newletter = new Letter({ msg: msg.msg });
  console.log(
    "🚀 ~ file: letters.controller.js ~ line 20 ~ exports.create= ~ newletter",
    newletter
  );
  try {
    await newletter.save();
  } catch (e) {
    // HTTP 상태 500 와 Internal Error 라는 메시지를 반환하고,
    // 에러를 기록합니다.
    return ctx.throw(500, e);
  }

  // 저장한 결과를 반환합니다.
  ctx.body = newletter;
};
exports.delete = async (ctx) => {
  const id = ctx.params.id;
  console.log(
    "🚀 ~ file: letters.controller.js ~ line 37 ~ exports.delete ~ _id",
    ctx.params.id
  );
  try {
    await Letter.findOneAndRemove({ _id: id }).exec();
    ctx.body = "delete";
  } catch (e) {
    if (e.name === "CastError") {
      ctx.status = 400;
      return;
    }
  }
  ctx.status = 204;
};

exports.replace = (ctx) => {
  ctx.body = db.letters;
};

exports.update = (ctx) => {
  ctx.body = db.letters;
};
