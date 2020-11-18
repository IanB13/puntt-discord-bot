const mongoose = require("mongoose")

//no id as using mongoDB ID
const customerSchema = new mongoose.Schema({
    name: String,
    tournament:String,
    dateTime: Date

})

customerSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})


const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer