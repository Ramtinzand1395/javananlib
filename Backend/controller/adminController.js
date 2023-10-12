const Author = require("../models/Author");
const User = require("../models/User");
const Book = require("../models/Books");

const multer = require("multer");
const shortId = require("shortid");
const sharp = require("sharp");
const { fileFilter } = require("../utils/multer");
const fs = require("fs/promises");
const appRoot = require("app-root-path");
const path = require("path");
const BooksData = require("../models/BooksData");

exports.uploadImage = (req, res) => {
  const upload = multer({
    limits: { fileSize: 4000000 },
    fileFilter: fileFilter,
  }).single("autherImage");

  upload(req, res, async (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
      }
      res.status(400).send(err);
    } else {
      if (req.file) {
        const fileName = `${shortId.generate()}_${req.file.originalname}`;
        await sharp(req.file.buffer)
          .jpeg({
            quality: 60,
          })
          .toFile(`./public/uploads/authors/${fileName}`)
          .catch((err) => console.log(err));
        res.status(200).json({
          data: `http://localhost:5000/uploads/authors/${fileName}`,
          message: "عکس با موفقیت آپلود شد.",
        });
      } else {
        res.status(404).json({ message: "جهت آپلود باید عکسی انتخاب کنید" });
      }
    }
  });
};

exports.createAuthor = async (req, res) => {
  const { name, description } = req.body.values;
  try {
    if (!req.body.AuthorImg) {
      return res.status(400).json({ message: "آپلود عکس الزامی میباشد." });
    }
    await Author.create({ name, description, authorImage: req.body.AuthorImg });
    return res.status(201).json({ message: "نوسنده با موفقیت ذخیره شد." });
  } catch (err) {
    console.log(err);
  }
};

exports.GetAllAuthors = async (req, res) => {
  try {
    const Authors = await Author.find();
    return res.status(200).json(Authors);
  } catch (err) {
    console.log(err);
  }
};

exports.updateAuthor = async (req, res) => {
  const { name, description, authorId, AuthorImg, authorLastImg } = req.body;
  const author = await Author.findById({ _id: authorId });
  if (author) {
    author.name = name;
    author.description = description;
    if (AuthorImg) {
      const filename = path.basename(authorLastImg);
      const filePath = `${appRoot}/public/uploads/authors/${filename}`;
      try {
        await fs.unlink(filePath);

        author.authorImage = AuthorImg;
        await author.save();
        return res.status(201).json({ message: "تغییرات با موفقیت انجام شد." });
      } catch (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "خطا در حذف فایل" });
      }
    } else {
      await author.save();
      return res.status(201).json({ message: "تغییرات با موفقیت انجام شد." });
    }
  } else {
    res.status(400).json({ message: "نویسنده با این مشخصات پیدا نشد." });
  }
};

exports.deleteAuthor = async (req, res) => {
  const { authorId, authorImage } = req.body;
  const filename = path.basename(authorImage);
  const filePath = `${appRoot}/public/uploads/authors/${filename}`;

  try {
    const deletedAuthor = await Author.findByIdAndRemove({ _id: authorId });
    const deleteImg = await fs.unlink(filePath);
    if (deleteImg === undefined && deletedAuthor) {
      res
        .status(200)
        .json({ deletedAuthor, message: "نویسنده با موفقیت حذف شد." });
    } else {
      return res.status(500).json({ message: "خطا در حذف فایل" });
    }
  } catch (err) {
    console.log(err);
  }
};

//User
exports.GetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

exports.Changestatus = async (req, res) => {
  try {
    const { userId, selectedStatus } = req.body;
    const selecteduser = await User.findById(userId);
    if (selecteduser) {
      selecteduser.status = selectedStatus;
      await selecteduser.save();
      res.status(201).json({ message: "تغییرات با موفقیت انجام شد." });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const deletedUser = await User.findByIdAndRemove({ _id: userId });
    if (deletedUser) {
      res.status(201).json({ deletedUser, message: "کاربر با موفقیت حذف شد." });
    }
  } catch (err) {
    console.log(err);
  }
};

//BOOKS

exports.uploadBookImage = (req, res) => {
  const upload = multer({
    limits: { fileSize: 4000000 },
    fileFilter: fileFilter,
  }).single("bookImage");

  upload(req, res, async (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
      }
      res.status(400).send(err);
    } else {
      if (req.file) {
        const fileName = `${shortId.generate()}_${req.file.originalname}`;
        await sharp(req.file.buffer)
          .jpeg({
            quality: 60,
          })
          .toFile(`./public/uploads/books/${fileName}`)
          .catch((err) => console.log(err));
        res.status(200).json({
          data: `http://localhost:5000/uploads/books/${fileName}`,
          message: "عکس با موفقیت آپلود شد.",
        });
      } else {
        res.status(404).json({ message: "جهت آپلود باید عکسی انتخاب کنید" });
      }
    }
  });
};

exports.createBook = async (req, res) => {
  const { bookname, AuthoroftheBook, description, PublicationDate } = req.body.values;
  try {
    if (!req.body.BookImg) {
      return res.status(400).json({ message: "آپلود عکس الزامی میباشد." });
    }
    await Book.create({ bookname, AuthoroftheBook,PublicationDate, description, bookImage: req.body.BookImg });
    return res.status(201).json({ message: "کتاب جدید با موفقیت ذخیره شد." });
  } catch (err) {
    console.log(err);
  }
};

exports.GetAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (err) {
    console.log(err);
  }
};

exports.ChangeBookstatus = async (req, res) => {
  const { _id:message, userId , bookId , bookDataId , status} = req.body.message;
  const selectedbook = await Book.findById(bookId);
  const selectedBookData = await BooksData.findById({_id:bookDataId});

  try {
    if (selectedbook) {
      selectedbook.status = "notAvailable";

      selectedBookData.BorrowingDate = Date.now();
      selectedBookData.returnDate = Date.now();

      await selectedbook.save();
      await selectedBookData.save();
      res.status(201).json({ message: " کتاب با موفقیت برای کاربر ذخیره شد. " });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBook = async (req, res) => {
  const { bookId , bookImage} = req.body;
  const filename = path.basename(bookImage);
  const filePath = `${appRoot}/public/uploads/books/${filename}`;

  try {
    const deletedBook = await Book.findByIdAndRemove({ _id: bookId });
    const deleteImg = await fs.unlink(filePath);
    if (deleteImg === undefined && deletedBook ) {
      res
        .status(200)
        .json({ deletedBook , message: "نویسنده با موفقیت حذف شد." });
    } else {
      return res.status(500).json({ message: "خطا در حذف فایل" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateBook = async (req, res) => {
  const { bookname, AuthoroftheBook, description, PublicationDate, bookLastImg , bookId , BookImg } = req.body;
  const book = await Book.findById({ _id: bookId });
  if (book) {
    book.bookname = bookname;
    book.description = description;
    book.AuthoroftheBook = AuthoroftheBook;
    book.PublicationDate = PublicationDate;
    
    if (BookImg) {
      const filename = path.basename(bookLastImg);
      const filePath = `${appRoot}/public/uploads/books/${filename}`;
      try {
        await fs.unlink(filePath);

        book.bookImage = BookImg;
        await book.save();
        return res.status(201).json({ message: "تغییرات با موفقیت انجام شد." });
      } catch (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "خطا در حذف فایل" });
      }
    } else {
      await book.save();
      return res.status(201).json({ message: "تغییرات با موفقیت انجام شد." });
    }
  } else {
    res.status(400).json({ message: "نویسنده با این مشخصات پیدا نشد." });
  }
};