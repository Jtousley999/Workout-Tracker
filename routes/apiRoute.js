var router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ day: -1 })
    .limit(1)
    .then((workout) => {
      res.json(workout);
      console.log(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  console.log(body);
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
