const { Router } = require("express");

const adminController = require("../controller/adminController");

const router = new Router();

router.post("/create-author-pic", adminController.uploadImage);
//create book pic
router.post("/create-book-pic", adminController.uploadBookImage);
//create Author details
router.post("/create-author-details", adminController.createAuthor);
//create Author details
router.post("/create-book-details", adminController.createBook);

//get Authors
router.get("/get-authors", adminController.GetAllAuthors);
//get users
router.get("/get-users", adminController.GetAllUsers);
//get Bokks
router.get("/get-books", adminController.GetAllBooks);

//change status
router.put("/change-status", adminController.Changestatus);
//change Book status
router.put("/change-book-status", adminController.ChangeBookstatus);
//update Author
router.put("/update-author", adminController.updateAuthor);
//update Book
router.put("/update-book", adminController.updateBook);

//delete book
router.delete("/delete-book", adminController.deleteBook);
//delete author
router.delete("/delete-author", adminController.deleteAuthor);
//delete User
router.delete("/delete-user", adminController.deleteUser);

module.exports = router;
