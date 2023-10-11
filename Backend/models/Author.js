const mongoose = require("mongoose");

const { schema } = require("./secure/authorValidation");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "نوسنده الزامی می باشد"],
    maxlength: [225, "نویسنده نباید بیشتر از 225 کاراکتر باشد"],
    minlength: [3, "نویسنده نباید کمتر از 3 کاراکتر باشد"],
  },
  description: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

authorSchema.statics.authorValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.models.Author || mongoose.model("Author", authorSchema);
