const AddEmployeeModel = require("../Model/AddEmployeeModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const addEmployeeController = async (req, resp) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      aadhar,
      panCard,
      jobRole,
      lastname,
      salary,
    } = req.body;

    // Validation
    if (
      !name ||
      !lastname ||
      !jobRole ||
      !email ||
      !password ||
      !aadhar ||
      !panCard ||
      !salary ||
      !mobile
    ) {
      return resp.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Check if the employee already exists
    const existingEmployee = await AddEmployeeModel.findOne({ email });
    if (existingEmployee) {
      return resp.status(400).json({
        success: false,
        message: "Email already exists. Please login.",
      });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Add new employee
    const employee = await AddEmployeeModel.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      aadhar,
      panCard,
      jobRole,
      lastname,
      salary,
    });

    resp.status(201).json({
      success: true,
      message: "Employee added successfully.",
      employee,
    });
  } catch (error) {
    console.error("Error in Add Employee API: ", error);
    resp.status(500).json({
      success: false,
      message: "Error in Add Employee API.",
      error: error.message || error,
    });
  }
};

//--------------------------------login--------------------------------------------

const loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return resp.status(400).json({
        success: false,
        massage: "please Provied all fields",
      });
    }
    // check user
    const employee = await AddEmployeeModel.findOne({ email });
    if (!employee) {
      return resp.status(404).json({
        success: false,
        massage: "Employee is Not Found",
      });
    }

    // compaire Password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return resp.status(404).json({
        success: false,
        massage: "Invalid Password",
      });
    }

    // create token
    const token = JWT.sign(
      { _id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    resp.status(200).json({
      success: true,
      massage: "Login Successfuly",
      token,
      employee: { _id: employee._id, name: employee.name, role: employee.role },
    });
  } catch (error) {
    console.error("Error in login API: ", error);
    resp.status(500).json({
      success: false,
      massage: "Error In Login API",
      error: error.message || error,
    });
  }
};

//verify
const verify = async (req, resp) => {
  return resp.status(200).json({
    success: true,
    employe: req.employee,
  });
};

module.exports = { addEmployeeController, loginController, verify };
