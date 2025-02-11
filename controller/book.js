const checkValidationSchema = require("../middleware/checkValidationSchema");
const Book = require("../model/Book");
const Cabin = require("../model/Cabin");
const Joi = require("joi");

const bookValidationSchema = Joi.object({
  travellers: Joi.number().min(1).required(),
  checkin: Joi.date().iso().required(),
  checkout: Joi.date().iso().required(),
});

const bookCabin = async (req, res, next) => {
  let book = req.body;
  console.log(book);
  try {
    await Book.create(book);
    res.status(200).send({ book, status: true });
    console.log("book created");
  } catch (err) {
    res.send(err);
  }
};

const getBookedCabins = async (req, res, next) => {
  let bookedCabins = await Book.find({});
  res.send(bookedCabins);
};

const cancelCabin = async (req, res, next) => {
  try {
    const { id } = req.params;
    let deleted = await Book.deleteOne({ cabinId: id });
    if (deleted) {
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  } catch (err) {
    res.status(500).send("internal server error");
  }
};


const deleteBook = async(req, res, next) => {
  try {
  const {id} = req.params;
  let deleted = await Book.deleteOne({ _id: id });
  if (deleted) {
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
} catch (err) {
  res.status(500).send("internal server error");
}
}
const fetchOneCabin = async (req, res, next) => {
  const { id } = req.params;

  let book = await Book.findById(id);
  res.send(book);
};

module.exports = {
  bookCabin,
  cancelCabin,
  bookValidationSchema,
  getBookedCabins,
  fetchOneCabin, 
  deleteBook
};
