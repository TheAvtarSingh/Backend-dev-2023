const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const student = require("./models/user.model");

app.use(cors());
app.use(express.json());
const check = mongoose.connect(
  "mongodb+srv://result_project:Avtar123@cluster0.lhvkopa.mongodb.net/StudentResultDatabase?retryWrites=true&w=majority"
);

if(check){
    console.log("Connected to Database");
    
}

/* app.get('/hello',(req,res)=>{
    res.send("Hello World")
}) */

app.post("/api/addStudent", async (req, res) => {
  try {
   await student.create({
      studentName: req.body.studentName,
      email: req.body.email,

      rollNumber: req.body.rollNumber,
    });
    // res.send(student);
    res.json({ status: "ok" });
  } catch (err) {
    res.json({status:'error',error:'Duplicate Email'})
  }

  console.log(req.body);

 
});

app.post("/api/loginStudent", async (req, res) => {
 await student.findOne({
    rollNumber:req.body.rollNumber,
    password:req.body.password,
  })
if (!student) {
    return res.json({status:'error',error:'Invalid Login'})
}else{
    return res.json({ status: 'ok', student: true })
}

/* const isPasswordValid = await bcrypt.compare(
    req.body.password,
    student.password
)
if (isPasswordValid) {
    const token = jwt.sign(
        {
            rollNumber: student.rollNumber,
            password: student.password,
        },
        'secret123'
    )

    return res.json({ status: 'ok', student: true })
} else {
    return res.json({ status: 'error', student: false })
}
 */

});

app.listen(1337, () => {
  console.log("Server Started at port 1337");
});
