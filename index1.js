/* // Importing express
// const express = require('express');
import  express  from 'express';
// const cors = require('cors');
import cors from 'cors';
import mongoose from 'mongoose';
// Using express method
const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



mongoose.connect("mongodb+srv://result_project:Avtar123@cluster0.lhvkopa.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
},()=>{
    console.log("Database Connected");
})

// getting request and sending response
/* app.get('/hello',(req,res)=>{
    res.send("Hello");
}) */

// Student Schema
const studentSchema = new mongoose.Schema({
   studentName:String,
   email:String,
   rollNumber:String
})

const student = new mongoose.model("student",studentSchema);

app.post('/verifyAdmin',(req,res)=>{
    res.send("This is Main Home Page");
})
app.get('/',(req,res)=>{
    res.send("This is Home Page");
})
app.post('/addStudent',(req,res)=>{
    const {studentName,email,rollNumber} = req.body
    student.findOne({email:email},(err,student)=>{
        if(student){
            res.send({message:"Student Already Existed !!"})
        }else{
            const student = new student({
                studentName,
                email,
                rollNumber
            })
            student.save(err =>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Successfully Inserted !!"})
                }
            })
        }
    })
    
    res.send("This is Main Home Page");
    console.log(req.body);
    
})

// Starting server on Port using Listener
  // "type": "module",

 app.listen(1337,()=>{
    console.log("Server started on port 1337");
}) 



