const app = require("express");

const router = app.Router();
const controller = require("../controller/UserController");


router.post("/register", controller.add);
router.post("/login", controller.login);
router.get("/forgot-password", controller.resetPasswordEmail);
router.put("/reset-password", controller.resetPassword);

module.exports = router;
