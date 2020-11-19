const puppeteer = require('puppeteer');

const scrapePoolTypes = async (link) =>{
    const browser = await puppeteer.launch({
        headless: true 
    });

    const page = await browser.newPage();
    
    await page.goto(link);

    await page.waitForSelector(".pool-list__pool")

    const poolLinks = await page.evaluate(() => {
        const poolNodes = document.querySelectorAll(".pool-list__pool")
        const poolLinks =[]
        for(const poolNode of poolNodes){
            const name = poolNode.children[1].innerText
            const relativeLink = poolNode.lastElementChild.children[0].getAttribute('href');
            const link = `https://puntt.gg${relativeLink}`
            poolLinks.push({name,link})
        }
        return poolLinks
    })
    

    browser.close()
    return poolLinks

}

module.exports = scrapePoolTypes