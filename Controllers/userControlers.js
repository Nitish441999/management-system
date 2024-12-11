// userControllers.js
// Ensure this path is correct

const userModel = require("../Model/userModel");

const usersControllers = async (req, res) => {
  try {
    const { name, lastname } = req.body;

    if (!name || !lastname) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userModel.create({ name, lastname });
    res.status(201).json({
      success: true,
      message: "Employee added successfully.",
      user,
    });
  } catch (error) {
    console.error("Error in Add Employee API: ", error);
    res.status(500).json({
      success: false,
      message: "Error in Add Employee API.",
      error: error.message,
    });
  }
};

// Ensure proper export
module.exports = { usersControllers };
