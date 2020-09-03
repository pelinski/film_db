const express = require("express");
const router = express.Router();

const Film = require("../models/Film");
const options = require("../models/options.json")

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

//serve options for front form 

router.get("/options", async (req, res) => {
  try {
    res.status(200).json(options)
  }
  catch (err) {
    res.status(500).json({ message: errMsg })
  }
});


//POST FILM
router.post("/", async (req, res) => {
  try {
    const { album = "A",
      filmType,
      camera,
      colorType,
      scan,
      year,
      month,
      location,
      comments } = req.body;
    const { filmId: lastFilmId } = await Film.findOne({ "filmId.album": album }).sort({ field: 'asc', _id: -1 }).limit(1) || 0;
    const number = lastFilmId?.number + 1 || 1; //if there's no last film this is number 1
    const serialNumber = album + number.toLocaleString(undefined, { minimumIntegerDigits: 2 });
    await Film.create({ filmId: { album, number }, serialNumber, filmType, camera, colorType, scan, date: { year, month }, location, comments },
      async (err, film) => {
        if (err) return res.status(200).json({ message: errMsg, mongoError: err });
        res.status(200).json({ message: "Film created", film });
      })
  } catch (err) {
    res.status(500).json({ message: errMsg })
  }
});


module.exports = router;