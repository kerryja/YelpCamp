const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const wrapAsync = require("../utils/wrapAsync");

const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

router
  .route("/")
  .get(wrapAsync(campgrounds.index))
  .post(
    isLoggedIn,
    validateCampground,
    wrapAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(campgrounds.getCampground))
  .put(isLoggedIn, validateCampground, wrapAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, wrapAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  wrapAsync(campgrounds.renderEditForm)
);

module.exports = router;
