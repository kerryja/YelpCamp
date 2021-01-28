const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptor, place } = require("./seedHelpers");

const Campground = require("../models/campground");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 40) + 10;
    const campground = new Campground({
      name: `${sample(descriptor)} ${sample(place)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      image: "https://source.unsplash.com/collection/483251",
      description: "lorem ipsum lorem ipsum lorem ipsum",
      price,
    });
    await campground.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
