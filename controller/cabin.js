const Cabin = require("../model/Cabin");
const User = require("../model/User");
const path = require("path");
const fs = require("fs");
const InspirationCabin = require("../model/InspirationCabin");

const fetchCabins = async (req, res) => {
  let cabins = await Cabin.find({});
  res.send(cabins);
};

const fetchOneCabin = async (req, res) => {
  try {
    const id = req.params.id;
    let cabin = await Cabin.findOne({ _id: id });
    res.send(cabin);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const searchCabinByNameOrByPlace = async (req, res) => {
  let { cabinOrPlace } = req.body;

  const cabins = await Cabin.find({
    $or: [
      { cabinName: { $regex: cabinOrPlace, $options: "i" } }, // Case-insensitive match
      { placeName: { $regex: cabinOrPlace, $options: "i" } },
    ],
  });

  if (!cabins) {
    res.status(404).send("cabins not found");
  }
  res.send(cabins);
};

const fetchOneInspirationCabin = async (req, res) => {
  const id = req.params.id;
  let inspirationCabin = await InspirationCabin.findOne({ _id: id });
  res.send(inspirationCabin);
};

const fetchInspirationCabins = async (req, res) => {
  let inspirationCabins = await InspirationCabin.find({});
  res.send(inspirationCabins);
};

const postCabin = async (req, res) => {
  try {
    let imagePath = null;
    if (req.files) {
      let rootPath = path.resolve();
      imagePath = path
        .join("/uploads/cabin", `${Date.now()}-${req.files.image.name}`)
        .replaceAll("\\", "/");
      req.files.image.mv(path.join(rootPath, imagePath));
    }

    let cabin = await Cabin.create({ ...req.body, image: imagePath });

    res.send(cabin);
  } catch (err) {
    res.send(err);
  }
};

const postInspirationCabin = async (req, res) => {
  try {
    let imagePath = null;
    if (req.files) {
      let rootPath = path.resolve();
      imagePath = path
        .join(
          "/uploads/inspirationCabin",
          `${Date.now()}-${req.files.image.name}`
        )
        .replaceAll("\\", "/");
      req.files.image.mv(path.join(rootPath, imagePath));
    }

    let inspirationCabin = await InspirationCabin.create({
      ...req.body,
      image: imagePath,
    });

    res.send(inspirationCabin);
  } catch (err) {
    res.send(err);
  }
};

const updateCabin = async (req, res) => {
  let { id } = req.params;
  let updatedCabin = req.body;

  let cabin = await Cabin.findByIdAndUpdate(id, updatedCabin, {
    new: true,
    runValidtors: true,
  });
  res.send("cabin updated successfully");
};

const deleteCabin = async (req, res) => {
  let matched = await Cabin.findOne({ _id: req.params.id });

  if (matched) {
    let cabin = await Cabin.deleteOne({ _id: req.params.id });
    fs.unlink(path.join(path.resolve(), matched.image), (err, data) => {
      console.log(err);
    });
    return res.send("cabin deleted");
  }
  res.send("cabin not found");
};

module.exports = {
  fetchCabins,
  postCabin,
  updateCabin,
  deleteCabin,
  postInspirationCabin,
  fetchInspirationCabins,
  fetchOneCabin,
  fetchOneInspirationCabin,
  searchCabinByNameOrByPlace,
};
