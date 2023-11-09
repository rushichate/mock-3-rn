const express = require("express")
const { UserModel } = require("../moduls/user.modul")
const { FlightModel } = require("../moduls/flight.model")
const { BookingModel } = require("../moduls/booking.model")
const bookingRoute = express.Router()

bookingRoute.post("/",async(req,res)=>{

    const {userID , flightID} = req.body

    try{
        const user = await UserModel.findById(userID)
        const flight = await FlightModel.findById(flightID)
        if(!user || !flight){
            return res.status(200).json({message:"User or Flight not found"})
        }
        const booking = new BookingModel({user:userID,flight:flightID})
        await booking.save()
        res.status(201).json({message:"Booking Done"})

    }catch(error){
        res.status(400).json(error.message)
    }
})


module.exports = {
    bookingRoute
}