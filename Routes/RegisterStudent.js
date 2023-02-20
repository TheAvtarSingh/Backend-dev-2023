const express = require("express");
const router = express.Router();
const Student = require("../models/Students");

router.post("/registerStudent", async (req, res) => {
  try {
    await Student.create({
      StudentName: req.body.StudentName,
      RollNumber: req.body.RollNumber,
      Email: req.body.Email,
      Password: req.body.Password,
      Field: req.body.Field,
      Department: req.body.Department,
      Class: req.body.Class,
      Marks: {
        Physics: req.body.Physics,
        Chemistry: req.body.Chemistry,
        Maths: req.body.Maths,
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
