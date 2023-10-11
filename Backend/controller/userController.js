const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("آدرس ایمیل یا کلمه عبور اشتباه است");
    }
    if(user.status === "pendding"){
      return res.status(400).send("در انتظار تایید ادمین");
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (isEqual) {
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET
      );
      res
        .status(200)
        .setHeader("token", token)
        .json({ token, userId: user._id.toString() });
    } else {
      res.status(400).send("آدرس ایمیل یا کلمه عبور اشتباه است");
    }
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    await User.userValidation(req.body);
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send("کاربری با این ایمیل در پایگاه داده موجود است");
    } else {
      const user = await User.create(req.body);
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET
      );
      res.status(201).json({ token, message: "عضویت موفقیت آمیز بود" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { username, email, mobile, address } = req.body.values;
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });

    if (user) {
      // Check if the email is already registered by someone else
      const isEmailRegistered = await User.findOne({
        email: email,
        _id: { $ne: userId },
      });

      if (!isEmailRegistered) {
        user.username = username;
        user.email = email;
        user.mobile = mobile;
        user.address = address;
        await user.save();
        res.status(201).json({ message: "تغغیرات با موفقیت انجام شد." });
      } else {
        res.status(400).json({ message: "این ایمیل قبلاً ثبت شده است." });
      }
    } else {
      res.status(400).json({ message: "کاربری با این ایمیل پیدا نشد." });
    }
  } catch (err) {
    next(err);
  }
};
