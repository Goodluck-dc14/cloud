const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Artiste = require("./model1");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "doxnfrmdd",
  api_key: "111997775637126",
  api_secret: "aqzZh8P5hBieIa0KB_O29pzocsw",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads1");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb("unsupported file format");
  }
};

const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

router.get("/", async (req, res) => {
  try {
    const getData = await Artiste.find();
    res.status(200).json({
      message: "found successfully",
      data: getData,
    });
  } catch (error) {
    res.status(404).json({
      message: "error",
      data: error,
    });
  }
});

router.post("/", upload.single("picture"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log(result);
  res.json(result);
  try {
    const getData = await Artiste.create({
      name: req.body.name,
      description: req.body.description,
      order: req.body.order,
      amount: req.body.amount,
      price: req.body.price,
      image: req.secure_url,
    });
    res.status(201).json({
      message: "created successfully",
      data: getData,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: error,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const getData = await Artiste.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      message: "updated successfully",
      data: getData,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getData = await Artiste.findById(req.body);
    res.status(200).json({
      message: "found successfully",
      data: getData,
    });
  } catch (error) {
    res.status(404).json({
      message: "error",
      data: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const getData = await Artiste.findByIdAndRemove(req.params.id, req.body);
    res.status(201).json({
      message: "deleted successfully",
      data: getData,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: error,
    });
  }
});

module.exports = router;
