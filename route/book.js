const express = require("express");
const {
  bookCabin,
  cancelCabin,
  bookValidationSchema,
  getBookedCabins,
} = require("../controller/book");
const checkValidationSchema = require("../middleware/checkValidationSchema");
const router = express.Router();
// checkValidationSchema(bookValidationSchema),


router.post("/book",  bookCabin);
router.delete(
  "/book/cancel/:id",

  cancelCabin
);

router.get("/bookedcabins", getBookedCabins);

module.exports = router;
