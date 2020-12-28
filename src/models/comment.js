const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  cmt: { type: String },
  createdAt: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("comment", CommentSchema);
