const puppeteer = require('puppeteer');

const scrapeOdds = async (link) =>{
    const browser = await puppeteer.launch({
        headless: true 
    });

    const page = await browser.newPage();
    
    await page.goto(link);

    await page.waitForSelector(".outcome-widget")

    const odds = await page.evaluate(() => {
        
        const poolNode = document.querySelector(".icon-title--small-grey-money");
        const poolAmountStr = poolNode.innerText
        const pool = poolAmountStr.split("£")[1]

        const typeStr = document.querySelector(".icon-title--small-grey-skull").innerText
        const type = typeStr.split(" /")[0]

        const playerNodeList = document.querySelectorAll(".outcome-widget");
        const players = []
        for(const playerNode of playerNodeList ){
            const playerAndAI = playerNode.children[1].innerText
            const [player, AI] = playerAndAI.split('\n');
            const team = playerNode.children[2].innerText
            const probBet = +playerNode.children[3].innerText

            players.push({player,team,AI,probBet })
        }
       
        return({
            pool,
            type,
            players
        })
    })
    return({
        link,
        ...odds
    })
   browser.close()


}

module.exports = scrapeOdds