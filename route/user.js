const express = require("express");
const {
  signup,
  login,
  getUsers,
  removeUser,
  getOneUser,
  getUserDetail,
  removeUserById,
} = require("../controller/user");
const checkValidationSchema = require("../middleware/checkValidationSchema");
const Joi = require("joi");
const { checkAuthentication } = require("../middleware/checkAuthentication");
const router = express.Router();

// const signupValidationSchema = Joi.object({
//   username: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string()
//     .min(8)
//     .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
//     .required(),
//   gender: Joi.string().valid("male", "female", "others").required(),
//   age: Joi.number().integer().min(12).max(100).required(),
//   usertype: Joi.string().valid("user", "admin").required(),
//   image: Joi.object({
//     mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
//     size: Joi.number()
//       .max(1024 * 1024 * 10)
//       .required(), // max size 10MB
//   }),
//   secretkey: Joi.string().when("usertype", {
//     is: "admin", // Conditional value
//     then: Joi.required().messages({
//       "any.required": "The secret key is required for admin signup.",
//     }),
//     otherwise: Joi.forbidden(), // Not allowed for non-admins
//   }),
// });
const signupValidationSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .empty("") // Handle empty string
    .messages({
      "any.required": "Username is required.",
      "string.base": "Username must be a valid string.",
      "string.min": "Username must be at least 3 characters long.",
      "string.max": "Username must be at most 30 characters long.",
      "string.empty": "Username cannot be empty.",
    }),

  email: Joi.string()
    .email()
    .required()
    .empty("") // Handle empty string
    .messages({
      "any.required": "Email is required.",
      "string.base": "Email must be a valid string.",
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email cannot be empty.",
    }),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .empty("") // Handle empty string
    .messages({
      "any.required": "Password is required.",
      "string.base": "Password must be a valid string.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base": "Password must contain only letters and numbers.",
      "string.empty": "Password cannot be empty.",
    }),

  gender: Joi.string()
    .valid("male", "female", "others")
    .required()
    .empty("") // Handle empty string
    .messages({
      "any.required": "Gender is required.",
      "string.base": "Gender must be a valid string.",
      "string.valid":
        "Gender must be one of the following: 'male', 'female', 'others'.",
      "string.empty": "Gender cannot be empty.",
    }),

  age: Joi.number()
    .integer()
    .min(12)
    .max(100)
    .required()
    .empty("") // Handle empty string
    .messages({
      "any.required": "Age is required.",
      "number.base": "Age must be a number.",
      "number.integer": "Age must be an integer.",
      "number.min": "Age must be at least 12.",
      "number.max": "Age must be at most 100.",
      "string.empty": "Age cannot be empty.",
    }),

  usertype: Joi.string()
    .valid("user", "admin")
    .required()
    .empty("") // Handle empty string
    .messages({
      "any.required": "User type is required.",
      "string.base": "User type must be a valid string.",
      "string.valid": "User type must be either 'user' or 'admin'.",
      "string.empty": "User type cannot be empty.",
    }),

  image: Joi.object({
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png")
      // .required()
      // .empty("") // Handle empty string
      .messages({
        // "any.required": "Image type is required.",
        "string.base": "Image type must be a valid string.",
        "string.valid": "Image must be either JPEG or PNG.",
        // "string.empty": "Image is required",
      }),

    size: Joi.number()
      .max(1024 * 1024 * 10) // max size 10MB
      .required()
      .empty("") // Handle empty string
      .messages({
        "any.required": "Image size is required.",
        "number.base": "Image size must be a number.",
        "number.max": "Image size must be at most 10MB.",
        "string.empty": "Image size cannot be empty.",
      }),
  }),

  secretkey: Joi.string()
    .when("usertype", {
      is: "admin", // Conditional value
      then: Joi.required().messages({
        "any.required": "The secret key is required for admin signup.",
      }),
      otherwise: Joi.forbidden().messages({
        "any.unknown": "Secret key is not allowed for non-admin users.",
      }), // Not allowed for non-admins
    })
    .empty("") // Handle empty string
    .messages({
      "string.empty": "Secret key cannot be empty for admins.",
    }),
});

const loginValidationSchema = Joi.object({
  // email: Joi.string().email().required(),
  // password: Joi.string()
  //   .min(8)
  //   .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  //   .required(),

  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.base": "Email must be a valid string.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email cannot be empty.",
  }),

  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "any.required": "Password is required.",
      "string.base": "Password must be a valid string.",
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password must be at most 32 characters long.",
      "string.empty": "Password cannot be empty.",
    }),
});

router.post("/signup", checkValidationSchema(signupValidationSchema), signup);
// router.post("/signup", signup);
router.post("/login", checkValidationSchema(loginValidationSchema), login);
router.get("/getusers", getUsers);
router.get("/getuser", checkAuthentication, getOneUser);
router.delete("/deleteUser/:email", removeUser);
router.get("/getuserdetail/:id", getUserDetail);
router.delete("/removeuserbyid/:id", removeUserById);

module.exports = router;
