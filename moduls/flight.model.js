const mongoose = require("mongoose")

const flightSchema = mongoose.Schema({
    airline: {type:String,required:true},
    flightNo: {type:String,required:true},
    departure: {type:String,required:true},
    arrival: {type:String,required:true},
    departureTime: {type:String,required:true},
    arrivalTime: {type:String,required:true},
    seats: {type:Number,required:true},
    price: {type:Number,required:true}
},{
    versionKey:false
})

const FlightModel = mongoose.model("fligth",flightSchema)

module.exports = {
    FlightModel
}