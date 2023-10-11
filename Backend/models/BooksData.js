const mongoose = require("mongoose");

const { schema } = require("./secure/booksdataValidation");

const bookdataSchema = new mongoose.Schema({
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
  BorrowingDate: {
    type: Date,
    default: null, // Set returnDate to null initially
  },
  returnDate: {
    type: Date,
    default: null, // Set returnDate to null initially
  },
  deliveredstatus: {
    type: String,
    default: "notDelivered",
    enum: ["notDelivered", "delivered"],
  },
  extension: {
    type: Number,
    required: true,
    default: 0,
  },
});

bookdataSchema.statics.bookdataValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports =
  mongoose.models.Bookdata || mongoose.model("Bookdata", bookdataSchema);
