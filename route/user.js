const express = require("express");
const { signup, login, getUser, removeUser, getOneUser } = require("../controller/user");
const checkValidationSchema = require("../middleware/checkValidationSchema");
const Joi = require("joi");
const { checkAuthentication } = require("../middleware/checkAuthentication");
const router = express.Router();

const signupValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  gender: Joi.string().valid("male", "female", "others").required(),
  age: Joi.number().integer().min(12).max(100).required(),
  usertype: Joi.string().valid("user", "admin").required(),
  // image: Joi.object({
  //   // mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
  //   // size: Joi.number()
  //   //   .max(1024 * 1024 * 5)
  //   //   .required(), // max size 5MB
  // }),
  secretkey: Joi.string().when("usertype", {
    is: "admin", // Conditional value
    then: Joi.required().messages({
      "any.required": "The secret key is required for admin signup.",
    }),
    otherwise: Joi.forbidden(), // Not allowed for non-admins
  }),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

router.post("/signup", checkValidationSchema(signupValidationSchema), signup);
// router.post("/signup", signup);
router.post("/login", checkValidationSchema(loginValidationSchema), login);
router.get("/getusers", getUser);
router.get("/getuser", checkAuthentication, getOneUser);
router.delete("/deleteUser/:email", removeUser);

module.exports = router;