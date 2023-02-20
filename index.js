const express = require('express')
const app = express()
const port = 5000
const mongodb = require('./db');
const RegisterStudent = require("./Routes/RegisterStudent")


mongodb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',RegisterStudent)

app.listen(port, () => {
  console.log(`Result app listening on port ${port}`)
})