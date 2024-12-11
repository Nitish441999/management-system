const express = require("express");
const {
  addEmployeeController,
  loginController,
  verify,
} = require("../Controller/AadEmployeeController");
const userAuthMiddleware = require("../Middlewares/userMiddlewares");
// const upload = require("../Middlewares/UplodeMiddlewares"); // Import the multer upload middleware
const router = express.Router();

// Add Employees using POST method
router.post("/addEmployee", addEmployeeController); // Use the upload middleware

// Login and Verify Routes
router.post("/login", loginController);
router.post("/verify", userAuthMiddleware, verify);

module.exports = router;
