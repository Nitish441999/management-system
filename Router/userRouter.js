// In your route file (where you define routes)

const express = require('express');
const { usersControllers } = require("../Controllers/userControlers"); // Correctly import the controller
const router = express.Router();

// Ensure you use `usersControllers` as the callback function
router.post("/usercreate", usersControllers);

module.exports = router;
