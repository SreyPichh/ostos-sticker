const mysql = require('mysql')
const dotenv = require('dotenv')
let instance = null
dotenv.config()

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DATABASE
})

connection.connect((err) => {
  if (err) {
    console.log(err.message)
  }
  console.log('db' + connection.state)
})

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService()
  }

  //Business

  async getAllData() {
    try {
      const res = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM business"
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message))
          resolve(results)
        })
      })
      return res
    }
    catch (error) {
      console.log(error)
    }
  }

  async insertNewBusiness(name, logo, address, phone_number, email, aba_name, acc_number, qr_code, invoice_toptext, invoice_note, digital_sign, facebook_link, instagram_link) {
    try {
      const created_date = new Date()
      console.log(created_date)
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO business (name, logo, address, phone_number, email, aba_name, acc_number, qr_code, invoice_toptext, invoice_note, digital_sign, facebook_link, instagram_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        connection.query(query, [name, logo, address, phone_number, email, aba_name, acc_number, qr_code, invoice_toptext, invoice_note, digital_sign, facebook_link, instagram_link], (err, result) => {
          if (err) reject(new Error (err.message))
          resolve(result.insertId)
        })
      })
      console.log(insertId)
      return insertId
    } catch (error) {
      console.log(error)
    }
  }

  //employee
  async getAllEmployee(){
    try {

    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = DbService