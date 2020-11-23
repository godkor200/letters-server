const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const msgSchema = new Schema(
  { msg: { type: String } },
  {
    createdAt: {
      // 기본값을 설정할땐 이렇게 객체로 설정해줍니다
      type: Date,
      default: Date.now, // 기본값은 현재 날짜로 지정합니다.
    },
  },
  {
    versionKey: false,
  },
  { typeKey: "$type" }
);

module.exports = mongoose.model("letter", msgSchema);
