const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
app.use(morgan('dev'))
// app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const userRoute = require('./routes/user')
app.use("/users", userRoute)

app.listen(5050, () => {
    console.log("Server listening on port 5050")
})