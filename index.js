const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
const { auth } = require("./middleware/authorization")
const { flightRoute } = require("./routes/flight.route")
const { bookingRoute } = require("./routes/booking.route")
const { dashboardRoute } = require("./routes/dashbord.route")
const app = express()

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Welcome To Flight Booking App")
})
app.use("/users",userRouter)
app.use(auth)
app.use("/flights",flightRoute)
app.use("/booking",bookingRoute)
app.use("/dashboard",dashboardRoute)

app.listen(8000,async()=>{
    try{
        
        await connection
        console.log(`connected to db and running on port 8000`)

    }catch(error){
        console.log(error)
    }
})