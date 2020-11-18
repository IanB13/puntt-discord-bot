const scrapeEvents = require("../utils/scrapeEvents")

module.exports = {
	name: 'update',
	description: 'Updates event data',
	execute(message, _args) {
        message.reply("Starting Update");
        (async()=>{
          await scrapeEvents()
        message.reply("update completed")
        })()
	},
};