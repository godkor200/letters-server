const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  cmt: { type: String },
  createdAt: {
    type: String,
    required: true,
  },
  name: {
    // 기본값을 설정할땐 이렇게 객체로 설정해줍니다
    type: String,
    required: true,
  },
});
CommentSchema.add({
  name: {
    // 기본값을 설정할땐 이렇게 객체로 설정해줍니다
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("comment", CommentSchema);
