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
      //send back as an object
      return {
        id: insertId,
        name: name,
        logo: logo,
        address: address,
        phone_number: phone_number,
        email: email,
        aba_name: aba_name,
        acc_number: acc_number,
        qr_code: qr_code, 
        invoice_toptext: invoice_toptext,
        invoice_note: invoice_note,
        digital_sign: digital_sign,
        facebook_link: facebook_link,
        instagram_link: instagram_link,
        created_date: created_date
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteBusinessById(id) {
    try {
      id = parseInt(id, 10)
      const response = new Promise ((resolve, reject) => {
        const query = "DELETE FROM business WHERE id = ?"
        connection.query(query, [id], (err, result) => {
          if(err) reject(new Error(err.message))
          resolve(result.affectedRows)
        })
      })
      return response === 1 ? false : true

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async updateBusinessById(id, name) {
    try {
      id = parseInt(id, 10)
      const response = new Promise ((resolve, reject) => {
        const query = "UPDATE business SET name = ? WHERE id = ?"
        connection.query(query, [name, id], (err, result) => {
          if (err) reject(new Error(err.message))
          resolve(result.affectedRows)
        })
      })
      return response === 1 ? true : false
    }
    catch(error) {
      console.log(error)
      return false
    }
  }

  //employee
  async getAllEmployee(){
    try {
      const employeeResult = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM employee"
        connection.query(query, (err, results) => {
          if (err) reject(new Error (err.message))
          resolve(results)
        })
      })
      return employeeResult
    } 
    catch (error) {
      console.log(error)
    }
  }

  async insertNewEmployee(name, email, phone_number, dob) {
    try{
      const  insertidEmployee = await new Promise((resolve, reject) => {
        const query = "INSERT INTO employee (name, email, phone_number, dob) VALUE (?, ?, ?, ?)"
        connection.query(query, [name, email, phone_number, dob], (err, result) => {
          if (err) reject(new Error(err.message))
          resolve(result.insertidEmployee)
        })
      })
      return {
        id: insertidEmployee,
        name: name,
        email: email
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteEmployeeById(id) {
    try {
      id  = parseInt(id, 10)
      const response = new Promise((resolve, reject) => {
        const query = "DELETE FROM employee WHERE id =?"
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message))
          resolve(result.affectedRows)
        })
      })
      return response === 1 ? false : true
     }
    catch(error) {
      console.log(error)
    }
  }
}
module.exports = DbService