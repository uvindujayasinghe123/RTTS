const express = require ('express'),
      User    = require ('../model/user'),
      trainController = require('../controller/TrainController')

router = express.Router();

router.post('/train/:id/locationUpdate', trainController.locationUpdate);
router.post("/train/add", trainController.addTrain);
router.get("/train/all", trainController.getAll);
router.get("/train/:id/changeState", trainController.changeState); // query param isActive=true/false
router.post("/train/search", trainController.search);
router.post("/train/timeTable", trainController.timeTable);


// posts routes
const postController = require("../controller/PostController");
router.post("/post", postController.add)
router.put("/post", postController.edit);
router.delete("/post", postController.delete);
router.get("/post", postController.getAll);
router.get("/post/user", postController.getByUser);

const auth = require("./auth.route");
router.use("/auth", auth);

const feedbackController = require("../controller/FeedbackController");
router.post("/feedback", feedbackController.add);
router.put("/feedback", feedbackController.edit);
router.delete("/feedback", feedbackController.delete);
router.get("/feedback", feedbackController.getAll);
router.get("/feedback/user", feedbackController.getByUser);

const userController = require("../controller/UserController");
router.post("/user", userController.add);
router.put("/user", userController.edit);
router.delete("/user", userController.delete);
router.get("/user", userController.getAll); 
router.get("/user/user", userController.getByUser);

router.get("/dashboard", require("../controller/AdminController").adminDashboard);

module.exports = router;