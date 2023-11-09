const express = require("express")
const { BookingModel } = require("../moduls/booking.model")
const dashboardRoute = express.Router()


dashboardRoute.get("/",async(req,res)=>{
    try{
        const bookings = await BookingModel.find()
        res.status(200).json(bookings)

    }catch(error){
        res.status(400).json(error.message)
    }
})

dashboardRoute.put("/:id",async(req,res)=>{
    try{
         await BookingModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(204).json({message:"Booking Updated"})

    }catch(error){
        res.status(400).json(error.message)
    }
})

dashboardRoute.delete("/:id",async(req,res)=>{
    try{
       await BookingModel.findByIdAndDelete(req.params.id)
       res.status(202).json({message:"Booking Canceled"})
    }catch(error){
        res.status(400).json(error.message)
    }
})


module.exports = {
    dashboardRoute
}