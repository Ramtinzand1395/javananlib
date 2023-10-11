const BookData = require("../models/BooksData");
const Book = require("../models/Books");
const Message = require("../models/Message");

exports.BorrowbookMessage = async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const userbooks = await BookData.find({ userId });
    const selectedbook = await Book.findById(bookId);
    // Check if user has any books that are not delivered
    const hasNotDeliveredBooks = userbooks.some(
      (userbook) => userbook.deliveredstatus === "notDelivered"
    );

    if (hasNotDeliveredBooks) {
      return res
        .status(401)
        .json({ message: "شما کتابی دارید که تحویل ندادید" });
    }

    // If all books are delivered, create a new BookData entry
    if (selectedbook) {
      selectedbook.status = "notAvailable";
      await selectedbook.save();
    } else {
      return res
        .status(400)
        .json({ message: " کتابی با این مشخصات پیدا نشد. " });
    }
    const { _id } = await BookData.create({ userId, bookId });
    await Message.create({ userId, bookId, bookDataId: _id });
    // Send success message
    res.status(200).json({
      message: "درخواست شما با موفقیت ثبت و برای ادمین ارسال شد.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور رخ داده است." });
  }
};

exports.GetRequests = async (req, res) => {
  const requsts = await Message.find();
  res.status(200).json({ requsts });
};

exports.ConfirmRequest = async (req, res) => {
  const { userId, _id: messageId, bookId } = req.body.message;
  const { status } = req.body;
  const selectedbook = await Book.findById(bookId);
  const message = await Message.findById(messageId);
  try {
    if (message) {
      if (status === "confirmed") {
        message.status = "confirmed";
        message.readByAdmin = true;
        await message.save();
      } else if (status === "Rejected") {
        message.status = "Rejected";
        message.readByAdmin = true;
        selectedbook.status = "Available";
        await selectedbook.save();
        await message.save();
      }
      res.status(201).json({ mymessage: "پیام برای کاربر ارسال شد." , message });
    } else {
      return res
        .status(400)
        .json({ message: " کتابی با این مشخصات پیدا نشد. " });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getUserMessage = async(req,res) =>{
  try {
    const {userId} = req.body;
    const messages = await Message.find({userId});
    res.status(200).json({messages})
  } catch (err) {
    console.log(err)
  }
};

exports.UserMarkAsRead = async(req,res) =>{
  try {
    const {_id} = req.body.message;
    const message = await Message.findById(_id);
    if (message) {
      message.readByUser = true;
      await message.save();
    } 
    res.status(200).json({message})
  } catch (err) {
    console.log(err)
  }
}