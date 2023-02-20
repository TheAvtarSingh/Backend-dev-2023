const mongoose = require('mongoose')

const {Schema } = mongoose;

const StudentSchema = new Schema({
    img:{
        type:String,
        default : "https://source.unsplash.com/random/300×300/?student"
    },
    StudentName:{
        type : String,
        required : true,
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
    Field:{
        type : String,
        required : true,
    },
    Department:{
        type : String,
        required : true,
    },
    Class:{
        type : String,
        required : true,
    },
    Marks:{
        type: Object,
        required : true,
    },
    DateofCreation: {
        type:Date,
        required:true,
        default : Date.now
    }
})

module.exports = mongoose.model('student',StudentSchema);