const express = require("express");
const {
  bookCabin,
  cancelCabin,
  bookValidationSchema,
  getBookedCabins,
  fetchOneCabin,
  deleteBook,
} = require("../controller/book");
const checkValidationSchema = require("../middleware/checkValidationSchema");
const router = express.Router();
// checkValidationSchema(bookValidationSchema),

router.post("/book", bookCabin);
router.delete("/book/cancel/:id", cancelCabin);
router.delete("/book/delete/:id", deleteBook);

router.get("/bookedcabins", getBookedCabins);
router.get("/booked/getonecabin/:id", fetchOneCabin);

module.exports = router;
