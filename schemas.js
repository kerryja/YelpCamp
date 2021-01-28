const Joi = require("joi");

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(10),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});