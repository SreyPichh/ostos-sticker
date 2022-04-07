const express = require('express')
const router = express.Router()

const dbService = require('../dbService')

// Create
router.post('/', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const phone_number = req.body.phone_number
  const dob = req.body.dob
  
  const db = dbService.getDbServiceInstance()
  const result = db.insertNewEmployee(name, email, phone_number, dob)
  result
  .then(data => res.json({sucess: true}))
  .catch(err => console.log(err))
})



// Read
router.get('/', (req, res) => {
  const db = dbService.getDbServiceInstance()
  const employeeList = db.getAllEmployee()
  employeeList
  .then(data => res.json({data: data}))
  .catch(err => console.log(err))
  res.status(500)
})


// Update
router.put('/:id', (req, res) => {
  // const { id }
})

// Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const db = dbService.getDbServiceInstance()
  const result = db.deleteEmployeeById(id)
  result
  .then(data => res.json({success: data}))
  .catch(err => console.log(err))
})

module.exports = router