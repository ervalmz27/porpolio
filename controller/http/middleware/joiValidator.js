const Joi = require('joi');

const schema = Joi.object({
  fname: Joi.string()
    .required()
    .regex(/^[a-z .'-]+$/i),
  name: Joi.string()
    .required()
    .regex(/^[a-z .'-]+$/i),
  // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  // email: Joi.string().email({
  //     minDomainSegments: 2,
  //     tlds: {
  //         allow: ['com', 'net']
  //     }
  // }).required(),
  birthdate: Joi.date().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

module.exports = {
  validationMidlleware: (req, res, next) => {
    try {
      const { fname, lname, birthdate, city, country } = req.body;

      // eslint-disable-next-line no-unused-vars
      const { error, value } = schema.validate({
        fname,
        name: lname,
        birthdate,
        city,
        country,
      });
      if (error === undefined || typeof error === 'undefined') {
        return next();
      }

      // const err = new Error(error.details.map((errorObject) => errorObject.message).toString())
      // err.statusCode = 422
      res.status(422).json({
        status: false,
        message: error.message,
        data: null,
      });
      // next(err)
      return;
    } catch (err) {
      res.status(201).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },
};

// module.exports = {
//     validationEditMiddleware: (req, res, next) => {
//         try {
//             const {
//                 fname,
//                 lname,
//                 profilepicture
//             } = req.body

//             const {
//                 error,
//                 value
//             } = schema.validate({
//                 name: fname,
//                 name: lname
//             })
//             console.log(value)
//             if (error === undefined || typeof error === "undefined") {
//                 return next()
//             }

//             //const err = new Error(error.details.map((errorObject) => errorObject.message).toString())
//             //err.statusCode = 422
//             res.status(422).json({
//                 "status": false,
//                 "message": error.message,
//                 "data": null
//             })
//             //next(err)
//             return

//         } catch (err) {
//             console.log(err)
//             res.status(201).json({
//                 status: false,
//                 message: err.message,
//                 data: null
//             })
//             return
//         }
//     }
// }
