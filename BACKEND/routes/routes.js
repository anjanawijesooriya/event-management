const router = require("express").Router();
const Events = require("../models/models");

router.route("/create").post(async (req, res) => {
  //route for creating database insertion
  const { eType, eHall, eFood, eLtype, eDtype } = req.body;

  const eDate = Date(req.body.eDate);

  const eRevenue = Number(req.body.eRevenue);

  const newEvents = new Events({
    eType,
    eHall,
    eDate,
    eRevenue,
    eFood,
    eLtype,
    eDtype,
  });

  await newEvents
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error })); // else save to the db
});

router.route("/").get(async (req, res) => {
  //route for fetching al the data
  await Events.find()
    .then((events) => res.json(events))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/get/:id").get(async (req, res) => {
  //route for getting a relavant document using id
  const { id } = req.params;

  await Events.findById(id) //find by the document by id
    .then((events) => res.json(events))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/delete/:id").delete(async (req, res) => {
  //route for deleting a relavant document using id
  const { id } = req.params;

  await Events.findByIdAndDelete(id) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/update/:id").put(async (req, res) => {
  //route for updating a relavant document using id
  //backend route for updating relavant data and passing back
  const { id } = req.params;
  const { eType, eHall, eDate, eRevenue, eFood, eLtype, eDtype } = req.body;

  await Events.findByIdAndUpdate(id, {
    eType,
    eHall,
    eDate,
    eRevenue,
    eFood,
    eLtype,
    eDtype,
  }) //find the document by and update the relavant data
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, Error: error }));
});

module.exports = router;
