const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()


const dbService = require('../dbService')


// Create
router.post('/create', (req, res) => {
  const name = req.body.name
  const logo = req.body.logo
  const address = req.body.address
  const phone_number = req.body.phone_number
  const email = req.body.email
  const aba_name = req.body.aba_name
  const acc_number = req.body.acc_number
  const qr_code = req.body.qr_code
  const invoice_toptext = req.body.invoice_toptext
  const invoice_note = req.body.invoice_note
  const digital_sign = req.body.digital_sign
  const facebook_link = req.body.facebook_link
  const instagram_link = req.body.instagram_link
  
  const db = dbService.getDbServiceInstance()
  const result = db.insertNewBusiness(name, logo, address, phone_number, email, aba_name, acc_number, qr_code, invoice_toptext, invoice_note, digital_sign, facebook_link, instagram_link)
  result
  .then(data => res.json({data: data}))
  .catch(err => console.log(err))
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


// Delete
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params
  const db = dbService.getDbServiceInstance()
  const result = db.deleteBusinessById(id)
  result
  .then(data => res.json({success: true}))
  .catch(err => console.log(err))
})

module.exports = router