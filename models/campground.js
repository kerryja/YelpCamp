const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review");

const CampgroundSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
