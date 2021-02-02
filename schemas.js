const Joi = require("joi");

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(10),
    location: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});
