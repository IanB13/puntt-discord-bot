const scrapeEvents = require('../scrape/events')
const scrapeOdds = require('../scrape/odds')
const scrapePoolTypes = require('../scrape/poolTypes')
const Event = require('../../models/Event')

const updateAll = async() =>{
    const Events = await scrapeEvents()
    console.log(Events)



/*     await Event.deleteMany({})
    await Event.insertMany(events)
    return await Event.find({}) */
}

module.exports = updateAll