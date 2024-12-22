const checkValidationSchema = require("../middleware/checkValidationSchema");
const Cabin = require("../model/Cabin");
const Joi = require("joi");

const bookValidationSchema = Joi.object({
    cabins: Joi.array()
      .items({
        _id: Joi.required(),
        travellers: Joi.number().min(1).required(),
        checkin: Joi.date().required,
        checkout: Joi.date().required
      })
      .min(1)
      .required(),
  })


const bookCabin = async (req, res, next) => {
  let book = req.body;
  console.log(book);
  res.send(book);

}


module.exports = {
  bookCabin
}