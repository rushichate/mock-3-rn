const express = require("express")
const { FlightModel } = require("../moduls/flight.model")
const flightRoute = express.Router()


flightRoute.get("/",async(req,res)=>{
    try{
        const flights = await FlightModel.find()
        res.status(200).json(flights)

    }catch(error){
        res.status(400).json(error.message)
    }
})

flightRoute.post("/",async(req,res)=>{
     const{airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price} = req.body
    try{
        const newflight = new FlightModel({airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price})
        await newflight.save()
        res.status(201).json({message:"Flight added successfully"})

    }catch(error){
        res.status(400).json(error.message)
    }
})

flightRoute.get("/:id",async(req,res)=>{
    const {id} = req.params
    try{
        const flight = await FlightModel.findById(id)
        if(!flight){
            return res.status(200).json({message:"Flight with this id not Found"})
        }
        res.status(200).json(flight)

    }catch(error){
        res.status(400).json(error.message)
    }
})

flightRoute.put("/:id",async(req,res)=>{
    try{
         await FlightModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(204).json({message:"Flight Updated"})

    }catch(error){
        res.status(400).json(error.message)
    }
})

flightRoute.delete("/:id",async(req,res)=>{
    try{
       await FlightModel.findByIdAndDelete(req.params.id)
       res.status(202).json({message:"Flight Deleted"})
    }catch(error){
        res.status(400).json(error.message)
    }
})



module.exports = {
    flightRoute
}