# Back-End-Development-2023


# Creation of backend server

install 1. Express 2. Nodemon and 3.Mongoose
using `npm i express nodemon mongoose`

# Starting from making an Index.js file

## import express

`const express = require('express');`

## use express as app

`const app = express()`

## Specify the Port

`const port = 5000 `

## Make Required Methods

`app.get('/',(req,res)=>{res.send("Hello World")})`

`app.listen(port,()=>{console.log("Started at port ${port}")})`

![image](https://user-images.githubusercontent.com/88712571/219937392-f85cd711-abc0-4a1b-a104-cfe62fa3e1b9.png)


# Connect db so make db.js file

## import mongooose

`const mongoose = require('mongoose')`

## specify url

`const mongouri = "mongodb+srv://result_project:Avtar123@geturresult.jiq2aiw.mongodb.net/geturresult?retryWrites=true&w=majority";`

## method for connecting database and READ Opertaion

const mongodb = async () => {
// Setting checking of query to false to avoid errors
  mongoose.set("strictQuery", false);
// Conenct method
  await mongoose.connect(mongouri, { useNewUrlParser: true }, (err) => {
    // if any error occur
    if (err) console.log("---", err);

    else {
        //else
      console.log("Connected Successfully");
//fetchdata
      const fetched_data = mongoose.connection.collection("student");
   //execute methoc and convert to array
      fetched_data.find({}).toArray(function (err, data) {
        if (err) console.log(err);
        else console.log(data);
      });
    }
  });
};

## export file

`module.exports = mongodb`

![image](https://user-images.githubusercontent.com/88712571/219937419-b3d567cf-c9df-4a65-879a-6bf84d27c085.png)


# use in index.js

## import file
`const mongodb = require('./db');`

## call file
`mongodb();`

# Creating a Student

## specifying schema - here it refers to validations before data go as mongo is not gonna validate it as schema

## make models folder

## Create Schema File -- Students.js

`Note: The File Name makes the Collection in Database`

## import mongoose
`const mongoose = require('mongoose')`

## import schema
`const {Schema} = mongoose;`

## make Structure

const StudentSchema = new Schema({
    img:{
        type:String,
        default : "https://source.unsplash.com/random/300×300/?student"
    },
    RollNumber:{
        type : String,
        required : true,
    },
    Email:{
        type : String,
        required : true,
    },
    Password:{
        type : String,
        required : true,
    },
    DateofCreation: {
        type:Date,
        required:true,
        default : Date.now
    }
})

![image](https://user-images.githubusercontent.com/88712571/219937447-e03e59ee-2c03-4a48-b15c-08db778eaf77.png)

## export Module

`module.exports = mongoose.model('student',StudentSchema);`

![image](https://user-images.githubusercontent.com/88712571/219937459-47813ec5-0975-44e2-a47f-3fcd076f004d.png)


# Make The Router File -- RegisterStudent.js


## import express
`const express = require('express')`

## import router
`const router = express.Router() `

## import Student File
`const Student = require('../models/Students');`

## Make Post Method

router.post("/registerStudent", async (req, res) => {
  try {
    await Student.create({
     
      RollNumber: req.body.RollNumber,
      Email: req.body.Email,
      Password: req.body.Password,
      
    });
    res.json({ success: true });
  } catch (error) {
    console.log(err);
    res.json({ success: false });
  }
});

## Export File 
`module.exports = router;`

![image](https://user-images.githubusercontent.com/88712571/219937498-c4f17f92-1018-4563-8614-dca85bbe5912.png)


# Specify the Router File in Index.js

## import File
`const RegisterStudent = require("./Routes/RegisterStudent")`

## Make app.use method
`app.use(express.json())`

## specify url
`app.use('/api',RegisterStudent)`

# Calling from ThunderClient

## In Header Specify

`Content-Type : application/json`

## In Body

{
    
    "RollNumber": "20csu241",
    "Email": "singhaa2@gmail.com",
    "Password": "Avtar@123",
}

## Send File

![image](https://user-images.githubusercontent.com/88712571/219937524-4e3c5e5b-68fe-4a6b-997a-9887055934f0.png)


# Implementing Front end integration



