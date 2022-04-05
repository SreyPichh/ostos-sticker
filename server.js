const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const businessRouter = require('./routes/business')
app.use('/api/business', businessRouter)

const userRouter = require('./routes/user')
app.use('/api/users', userRouter)

const employeeRouter = require('./routes/employee')
app.use('/api/employee', employeeRouter)

//PORT
const port = process.env.PORT || 3000
app.listen(port)  