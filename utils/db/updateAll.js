const scrapeEvents = require('../scrape/events')
const scrapeOdds = require('../scrape/odds')
const scrapePoolTypes = require('../scrape/poolTypes')
const Event = require('../../models/Event')

const updateAll = async() =>{
    const Events = await scrapeEvents()
    console.log(Events)
    const updatedEvents = []
    for(const event of Events){
        const poolTypes = await scrapePoolTypes(event.link)
        const odds = await Promise.all( poolTypes.map( async (odd)=>{
            return await scrapeOdds(odd.link)
        }))
        updatedEvents.push({...event, odds})
    }
    console.log(updatedEvents[0].odds)

    await Event.deleteMany({})
    await Event.insertMany(updatedEvents)
    return await Event.find({})
}

module.exports = updateAll