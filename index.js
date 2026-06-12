require('dotenv').config()

const express=require('express')
const routes = require('./Routes/routes')

const cors = require('cors')


//creating server app instance
const app=express()

require('./Connection/connection')

//configuring cors to app
app.use(cors())

//configuring json middleware into app
app.use(express.json())

app.use(routes)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 3001

app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log(`server running at http://localhost:${PORT}`)
    }
})