const express = require("express");
const router = express.Router();

const Film = require("../models/Film");

const errMsg = "Something went wrong";

//GET ALL 
router.get("/", async (req, res) => {
  try {
    const filmList = await Film.find();
    res.status(200).json(filmList)
  }
  catch (err) {
    res.status(500).json({ message: errMsg })
  }
});

//POST FILM
router.post("/", async (req, res) => {
  try {
    const {
      serialNumber,
      filmType,
      camera,
      colorType,
      scan,
      year,
      month,
      location,
      comments } = req.body;

    await Film.create({ serialNumber, filmType, camera, colorType, scan, date: { year, month }, location, comments },
      async (err, film) => {
        if (err) return res.status(200).json({ message: errMsg, mongoError: err });
        res.status(200).json({ message: "Film created", film });
      })
  } catch (err) {
    res.status(500).json({ message: errMsg })
  }
});


module.exports = router;