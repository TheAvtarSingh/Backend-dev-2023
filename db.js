const mongoose = require("mongoose");
const mongouri =
  "mongodb+srv://result_project:Avtar123@geturresult.jiq2aiw.mongodb.net/geturresult?retryWrites=true&w=majority";

const mongodb = async () => {
// Setting checking of query to false to avoid errors
  mongoose.set("strictQuery", false);
// Conenct method
  await mongoose.connect(mongouri, { useNewUrlParser: true }, (err) => {
    if (err) console.log("---", err);

    else {
      console.log("Connected Successfully");
      const fetched_data = mongoose.connection.collection("student");
       fetched_data.find({}).toArray(function (err, data) {
        if (err) console.log(err);
        else console.log();
      }); 

      
    }
  });
};

module.exports = mongodb;
