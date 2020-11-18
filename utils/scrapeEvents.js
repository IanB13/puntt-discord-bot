const puppeteer = require('puppeteer');
const Event = require('../models/Event')

const scrapeEvents = async () =>{
    console.log("IN event scraping")
    const browser = await puppeteer.launch({
        headless: true , 
        defaultViewport: {width: 1920, height: 2000} //for larger screen shots 
    });

    const page = await browser.newPage();
    
    await page.goto("https://puntt.gg/matches");

    await page.waitForSelector(".match-widget")



    const events = await page.evaluate(() => {
        const events = []
        const eventList = document.querySelectorAll(".match-widget")
   
        const eventsArray = Array.from(eventList)

        for (const eventNode of eventsArray) {
            const event = {}
            for (const eventChild of eventNode.children) {

                switch (eventChild.className) {
                    case "match-widget__name":
                        event.name = eventChild.innerText
                        break;
                    case "match-widget__tournament":
                        event.tournament = eventChild.innerText
                        break;
                    case "match-widget__actions":
                        event.liveLink = eventChild.children[1].getAttribute('href')
                        break;
                    case "match-widget__datetime":
                        event.dateTime = Date.parse(eventChild.children[0].getAttribute('datetime'))
                        break;
                    default:
                        break;
                }
            }
            events.push(event)
        }

        return events
    })
    
    console.log(events)
    await Event.deleteMany({})
    await Event.insertMany(events)
    return await Event.find({})
}

module.exports = scrapeEvents