const express = require("express");
const router = express.Router();
const Student = require("../models/Students");
const { body, validationResult } = require('express-validator');

router.post("/registerStudent", 
body('Email',"Check Your Email Address").isEmail(),
// password must be at least 5 chars long
body('Password',"Minimum Length Should be 8").isLength({ min: 8 }),
body('RollNumber',"Follow Format YYDEPTROLLNO - XXXXXXXX").isLength({ min: 8 })

,async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
