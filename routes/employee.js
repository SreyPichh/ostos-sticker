const express = require('express')
const router = express.Router()

const dbService = require('../dbService')

// Create
router.post('/create', (req, res) => {
  const name = req.body.name
  const phone_number = req.body.phone_number
  const email = req.body.email
  const dob = req.body.dob
  
  const db = dbService.getDbServiceInstance()
  const result = db.insertNewEmployee(name, phone_number, email, dob)
  // result
  // .then(data => res.json({sucess: true}))
  // .catch(err => console.log(err))
})



// Read
router.get('/', (req, res) => {
  const db = dbService.getDbServiceInstance()
  const result = db.getAllData()
  console.log(result)
  result
  .then(data => res.json({data: data}))
  .catch(err => console.log(err))
  // res.status(500)
})

// Update


// Update

module.exports = router