const mongoose = require("mongoose");

const { schema } = require("./secure/messageValidation");

const messageSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
    required: [true, "ای دی کاربر الزامی می باشد"],
    ref: "User",
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "ای دی کتاب الزامی می باشد"],
    ref: "Book",
  },
  bookDataId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "ای دی کتاب الزامی می باشد"],
    ref: "Bookdata",
  },
  status: {
    type: String,
    default: null,
    enum: ["Rejected", "confirmed", null],
},
readByAdmin:{
  type:Boolean,
  default:false,
},
readByUser:{
  type:Boolean,
  default:false,
},
});

messageSchema.statics.messageValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.models.Message|| mongoose.model("Message", messageSchema);
