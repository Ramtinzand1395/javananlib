const { Router } = require("express");

const userController = require("../controller/userController");

const router = new Router();

router.post("/login", userController.handleLogin);
router.post("/register", userController.createUser);
router.post("/users/update-user", userController.updateUser);

module.exports = router;
