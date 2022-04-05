const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// middleware
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


const businessRouter = require('./routes/business')
app.use('/api/business', businessRouter)

const userRouter = require('./routes/user')
app.use('/api/users', userRouter)

const employeeRouter = require('./routes/employee')
app.use('/api/employee', employeeRouter)

//PORT
const port = process.env.PORT || 3000
app.listen(port)  