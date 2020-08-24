const express = require("express");
const router = express.Router();

const Film = require("../models/Film");

//GET ALL 
router.get("/", async (req, res, next) => {
  try {
    const filmList = await Film.find();
    res.status(200).json(filmList)
  }
  catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
});



module.exports = router;