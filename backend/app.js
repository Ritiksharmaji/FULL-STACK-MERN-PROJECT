
const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
require('dotenv').config()


const{readdirSync} = require('fs')
const { route } = require('./routes/transactions')
const app = express()
const PORT = process.env.PORT


app.use(express.json()) 

app.use(cors())  

app.get('/', (req, res)=>{
    res.send("hello Ritik bhai how are you !!!")
})

readdirSync('./routes').map((route)=>app.use('/api/v1', require('./routes/' + route)))

const server = ()=>{

    db();
    app.listen(PORT, ()=>{
        console.log("listeing to port:", PORT)
    })

}
server()