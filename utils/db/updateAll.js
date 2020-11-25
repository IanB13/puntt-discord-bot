const scrapeEvents = require('../scrape/events')
const scrapeOdds = require('../scrape/odds')
const scrapePoolTypes = require('../scrape/poolTypes')
const Event = require('../../models/Event')

const updateAll = async() =>{
    try {
    const Events = await scrapeEvents()
    const updatedEvents = []
    for (const event of Events) {
        if (event.link !== 'https://puntt.ggnull') {
            console.log(event)
            let poolTypes = null
            try {
                 poolTypes = await scrapePoolTypes(event.link)
            } catch (error) {
                console.log("error in selecting pool type")
                console.error(error)
            }
           
            if(!poolTypes) continue
            
            const odds = await Promise.all(poolTypes.map(async (odd) => {

                return await scrapeOdds(odd.link)

            }))
            updatedEvents.push({ ...event, odds })
        }
    }
        await Event.deleteMany({})
        await Event.insertMany(updatedEvents)
        return await Event.find({})
    } catch (error) {
        console.error("database Error")
        console.error(error)
    }
}

module.exports = updateAll