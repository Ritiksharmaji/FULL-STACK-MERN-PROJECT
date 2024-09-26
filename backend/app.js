
const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')

require('dotenv').config()
//to configure the router 
const{readdirSync} = require('fs')
const { route } = require('./routes/transactions')
const app = express()
const PORT = process.env.PORT

//middleware...
app.use(express.json())

app.use(cors())  // Allows all domains to access the API


app.get('/', (req, res)=>{
    res.send("hello Ritik bhai how are you !!!")
})
// to configure the router 
readdirSync('./routes').map((route)=>app.use('/api/v1', require('./routes/' + route)))

const server = ()=>{
    //console.log("server stated at 5000")
    // to connet the mongodb
    db();
    app.listen(PORT, ()=>{
        console.log("listeing to port:", PORT)
    })

}
server()