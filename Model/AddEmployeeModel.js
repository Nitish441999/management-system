const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is Required"],
    },
    image: {
      type: String,
      // Removed the required and default properties
      // You can keep this as a non-required field or add further customization if needed
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile Number is Required"],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    aadhar: {
      type: String,
      required: [true, "Aadhar Card Number is Required"],
      match: [/^\d{12}$/, "Aadhar number must be 12 digits"],
    },
    panCard: {
      type: String,
      required: [true, "Pan Card Number is Required"],
      // match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN number format is invalid"],
    },
    jobRole: {
      type: String,
      required: [true, "Job Role is Required"],
      enum: ["Engineering", "Marketing", "Human Resources", "Finance"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is Required"],
      min: [0, "Salary must be a positive number"],
    },
    role: {
      type: String,
      required: [true, "User type is required"],
      default: "employee",
      enum: ["employee", "admin"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
