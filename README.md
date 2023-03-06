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

`const mongouri = "Link";`

## method for connecting database and READ Opertaion

```
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

```

## export file

`module.exports = mongodb`

![image](https://user-images.githubusercontent.com/88712571/222642673-e54a341f-dfba-43c7-90fe-9f3f1714090e.png)


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

```
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

```

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

```

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

```

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

```

{
    
    "RollNumber": "20csu241",
    "Email": "singhaa2@gmail.com",
    "Password": "Avtar@123",
}

```

## Send File

![image](https://user-images.githubusercontent.com/88712571/219937524-4e3c5e5b-68fe-4a6b-997a-9887055934f0.png)


# Backend validation

use 

`https://express-validator.github.io/docs/`

`npm install --save express-validator`

## Change Syntax in RegisterStudent.js copy from Website

![image](https://user-images.githubusercontent.com/88712571/220177231-a5fb6e52-ab07-4210-86b2-bad002e97ab0.png)


# Integrate From Front-End


### Continue The Integration from Repo - In which we are Creating Student Registration Page

[Frontend-dev-2023 - Avtar Singh -Student](https://github.com/TheAvtarSingh/Frontend-dev-2023/blob/main/README.md#creation-of-student-form)

# Lets Login Admin From Front to Backend

[Frontend-dev-2023 - Avtar Singh -Admin](https://github.com/TheAvtarSingh/Frontend-dev-2023/blob/main/README.md#admin-section)

## Creating A Backend Request

## Check The Request at index.js and Specify the method in RegisterStudent.js Router


![image](https://user-images.githubusercontent.com/88712571/222779228-af6917cf-1b64-46e6-9cb3-50e255cc495f.png)

```

router.post(
  "/loginAdmin",
 

  async (req, res) => {
    let adminEmail = req.body.adminEmail;

    try {
      let adminData = await Admin.findOne({ adminEmail });
      if (!adminData) {
        return res
          .status(400)
          .json({
            errors: "Check Your Email or Admin Not Registered ! !",
          });
      }

      if (req.body.adminPassword !== adminData.adminPassword) {
        return res.status(400).json({ errors: "Check Your Password !!" });
      }
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

```

## Make Model/Schema in Models Folder to Specify the Structure

```
const mongoose = require('mongoose')

const {Schema} = mongoose;

const AdminSchema = new Schema({
    adminEmail:{
        type:String,
        required : true,
    },
    adminPassword:{
        type:String,
        required : true
    }
})

module.exports = mongoose.model('admin',AdminSchema);
```

![image](https://user-images.githubusercontent.com/88712571/222780404-226dee10-2738-406f-a3d7-bad55d3c8eb9.png)


## Sending Request

![image](https://user-images.githubusercontent.com/88712571/222780589-cbb21ebe-0ce3-4d58-9200-50fa48a2706a.png)

![image](https://user-images.githubusercontent.com/88712571/222781070-b29f846d-c8ef-492b-b6c1-ba1736cf2f0d.png)

![image](https://user-images.githubusercontent.com/88712571/222781155-cdb88c90-247f-4db7-8904-511383347ab0.png)

[Final Output - Admin](https://github.com/TheAvtarSingh/Frontend-dev-2023/blob/main/README.md#merged)

## Using Hashing as a Security (Encryption)

Using BcryptJs   `npm i bcryptjs`

import `const bcrypt = require('bcryptjs');`

##### Before Sendind Password to Database

```
const salt = await bcrypt.genSalt(10);
let secPassword = await bcrypt.hash(req.body.Password,salt)
```

##### Sending to Database

```
if (!studentData) {
        await Student.create({
          StudentName: req.body.StudentName,
          RollNumber: req.body.RollNumber,
          Email: req.body.Email,
          Password: secPassword,
          Field: req.body.Field,
          Department: req.body.Department,
          Class: req.body.Class,
          Marks: {
            Physics: req.body.Marks.Physics,
            Chemistry: req.body.Marks.Chemistry,
            Maths: req.body.Marks.Maths,
          },
```

Output : 

![image](https://user-images.githubusercontent.com/88712571/223076011-3d0e658b-2393-48b1-9daf-433bf06b6abe.png)

Database :

![image](https://user-images.githubusercontent.com/88712571/223076101-6f209817-cf6b-40c7-b6aa-bdaf9744c570.png)
