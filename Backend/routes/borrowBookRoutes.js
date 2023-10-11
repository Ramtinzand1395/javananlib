const { Router } = require("express");

const BorrowBookController = require("../controller/BorrowBookController");

const router = new Router();

router.post("/message", BorrowBookController.BorrowbookMessage);

router.get("/message", BorrowBookController.GetRequests);
//getUserMessages
router.post("/get-user-message", BorrowBookController.getUserMessage);

//Mark as Read User
router.post("/user-mark-as-read", BorrowBookController.UserMarkAsRead);

router.put("/confirm-message", BorrowBookController.ConfirmRequest);


module.exports = router;
