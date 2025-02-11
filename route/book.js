const express = require("express");
const {
  bookCabin,
  cancelCabin,
  getBookedCabins,
  fetchOneCabin,
  deleteBook,
} = require("../controller/book");
const checkValidationSchema = require("../middleware/checkValidationSchema");
const router = express.Router();
const Joi = require("joi");
// checkValidationSchema(bookValidationSchema),

const bookValidationSchema = Joi.object({
  // travellers: Joi.number().min(1).required(),
  // checkin: Joi.date().iso().min('now').required(),
  // checkout: Joi.date().iso().greater(Joi.ref('checkin')).required(),
  travellers: Joi.number().min(1).required().messages({
    "any.required": "Number of travellers is required.",
    "number.base": "Travellers must be a valid number.",
    "number.min": "At least one traveller is required.",
  }),

  checkin: Joi.date().iso().min("now").required().messages({
    "any.required": "Check-in date is required.",
    "date.base": "Check-in must be a valid date.",
    "date.min": "Check-in date must be today or in the future.",
  }),

  checkout: Joi.date().iso().greater(Joi.ref("checkin")).required().messages({
    "any.required": "Check-out date is required.",
    "date.base": "Check-out must be a valid date.",
    "date.greater": "Check-out date must be after the check-in date.",
  }),
});

router.post("/book", checkValidationSchema(bookValidationSchema), bookCabin);
router.delete("/book/cancel/:id", cancelCabin);
router.delete("/book/delete/:id", deleteBook);

router.get("/bookedcabins", getBookedCabins);
router.get("/booked/getonecabin/:id", fetchOneCabin);

module.exports = router;
