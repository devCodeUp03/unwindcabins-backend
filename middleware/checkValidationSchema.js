const checkValidationSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(
        { ...req.body, ...req.files },
        {
          allowUnknown: true,
          abortEarly: false,
        }
      );
      next();
    } catch (err) {

      let errors = {};
      err.details.map((el) => {
        errors[el.context.key] = {
          field: el.context.key,
          msg: el.message
        }
      })

      console.log(errors);
      return res.status(400).send({
        msg: "validation error",
        errors
        // err.details.map((el) => {
        //   return {
        //     field: el.context.key,
        //     msg: el.message,
        //   };
        // }),
      });
    }
  };
};

module.exports = checkValidationSchema;
