require('dotenv').config()
const express =require('express')
const mysql = require('mysql')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan("combined"))
// app.use(cors({origin:["http:localhost:3000","https://pref.my-pa.info"]}));
app.use(express.json());
app.use(cors())
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "signup",
//     port: 3306
// })


const connectionString = process.env.DATABASE_URI
const pg = require('pg')
const { Client } = pg
const db = new Client({
    connectionString: connectionString
})

db.connect((err)=>{
    if(err) throw err
    console.log("database working")

})


app.post('/signup',(req,res) => {
    console.log(req.body)
    const sql ="INSERT INTO login (name, email, password) VALUES ($1,$2,$3)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,values, (err,data) =>{
        if(err) { 
        return res.json("Error");
        }
    return res.json(data);
})
})

app.post('/login',(req,res) => {
    const sql ="SELECT * FROM login WHERE email = $1 AND password = $2";
    
    db.query(sql,[req.body.email,req.body.password], (err, data) =>{
        if(err) { 
        return res.json("Error");
        }
       console.log(data.rows)
     
        if(data.rowCount > 0) {
        return res.json("Success");
    } else {
        return res.json("Failed");
    }     
    })
})

app.listen(8081, ()=> {
    console.log("Listening...8081");
})
