const puppeteer = require('puppeteer');


const scrape = async () =>{
    const browser = await puppeteer.launch({
        headless: false , 
        defaultViewport: {width: 1920, height: 2000} //for larger screen shots 
    });

    const page = await browser.newPage();
    
    await page.goto("https://puntt.gg/matches");

    await page.waitForSelector(".match-widget")


    const events = await page.evaluate( () => {
        const events = []
        const eventList = document.querySelectorAll(".match-widget")
        console.log(eventList)
        const eventsArray = Array.from(eventList)
        console.log(eventsArray[0])
        for(const eventNode of eventsArray){
            const event = {}
            for(const eventChild of eventNode.children){
                
                switch (eventChild.className) {
                    case "match-widget__name":
                        event.name = eventChild.innerText
                        break;
                    case "match-widget__tournament":
                        event.tournament = eventChild.innerText
                        break;
                    case "match-widget__actions":
                        console.log(eventChild)
                        break;
                    case "match-widget__datetime":
                        event.dateTime =  Date.parse(eventChild.children[0].getAttribute('datetime'))
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
    
}
scrape()
module.exports = scrape