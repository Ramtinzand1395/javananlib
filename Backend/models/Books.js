const mongoose = require("mongoose");

const { schema } = require("./secure/booksValidation");

const bookSchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: [true, "نوسنده الزامی می باشد"],
    maxlength: [225, "نویسنده نباید بیشتر از 225 کاراکتر باشد"],
    minlength: [3, "نویسنده نباید کمتر از 3 کاراکتر باشد"],
  },
  AuthoroftheBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auther",
  },
  description: {
    type: String,
    required: true,
  },
  bookImage: {
    type: String,
    required: true,
  },
  PublicationDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Available",
    enum: ["Available", "notAvailable"],
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

bookSchema.statics.bookValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.models.Book || mongoose.model("Book", bookSchema);
