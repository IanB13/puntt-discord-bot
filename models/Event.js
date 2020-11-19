const mongoose = require("mongoose")

//no id as using mongoDB ID
const eventSchema = new mongoose.Schema({
    name: String,
    tournament:String,
    dateTime: Date,
    link: String,
    odds: {}

})

eventSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})


const Event = mongoose.model("Matches", eventSchema)

module.exports = Event