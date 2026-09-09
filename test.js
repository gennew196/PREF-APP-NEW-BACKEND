const mysql = require('mysql')


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup",
    port: 3306
})
db.connect()
db.ping((err) => {
    if (err) throw err
    console.log("database working"+ err)

})

const sql = "INSERT INTO login ('name','email','password') VALUES (?,?,?)";
const values = [
    "req.body.name",
    "req.body.email",
    "req.body.password"
]
db.query(sql, [values], (err, data) => {
    if (err) {
        console.log("Error");
    }
    console.log(data)
})
