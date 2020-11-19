const puppeteer = require('puppeteer');
const Event = require('../../models/Event')

const scrapeEvents = async () =>{
    const browser = await puppeteer.launch({
        headless: true 
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
            event.link = `https://puntt.gg${eventNode.parentElement.getAttribute('href')}`
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
    browser.close()
    //should seperate out db into seperate module
    await Event.deleteMany({})
    await Event.insertMany(events)
    return await Event.find({})
}
scrapeEvents()
module.exports = scrapeEvents