const router = require("express").Router();
const Decorations = require("../models/decorations");

router.route("/create").post(async (req, res) => {
  //route for creating database insertion
  const { dType, dLightings, dFlowers, dEquipment } = req.body;

  const dSeating = Number(req.body.dSeating);

  const newDecorations = new Events({
    dType,
    dLightings,
    dFlowers,
    dEquipment,
    dSeating,
  });

  await newDecorations
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error })); // else save to the db
});

router.route("/").get(async (req, res) => {
  //route for fetching al the data
  await Decorations.find()
    .then((decorations) => res.json(decorations))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/get/:id").get(async (req, res) => {
  //route for getting a relavant document using id
  const { id } = req.params;

  await Decorations.findById(id) //find by the document by id
    .then((decorations) => res.json(decorations))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/delete/:id").delete(async (req, res) => {
  //route for deleting a relavant document using id
  const { id } = req.params;

  await Decorations.findByIdAndDelete(id) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/update/:id").put(async (req, res) => {
  //route for updating a relavant document using id
  //backend route for updating relavant data and passing back
  const { id } = req.params;
  const { dType, dLightings, dFlowers, dEquipment, dSeating } = req.body;

  await Advertise.findByIdAndUpdate(id, {
    dType,
    dLightings,
    dFlowers,
    dEquipment,
    dSeating,
  }) //find the document by and update the relavant data
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, Error: error }));
});

module.exports = router;
