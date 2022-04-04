const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

const dbService = require('./dbService')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Create
app.post('/api/business/create', (req, res) => {
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

  console.log("++++++++++++")
  console.log(name)
  console.log(logo)

  const db = dbService.getDbServiceInstance()
  const result = db.insertNewBusiness(name, logo, address, phone_number, email, aba_name, acc_number, qr_code, invoice_toptext, invoice_note, digital_sign, facebook_link, instagram_link)
  // result
  // .then(data => res.json({sucess: true}))
  // .catch(err => console.log(err))
})



// Read
app.get('/', (req, res) => {
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



const userRouter = require('./routes/user')
app.use('/api/users', userRouter)

//PORT
const port = process.env.PORT || 3000
app.listen(port)  