const updateAll = require("../utils/db/updateAll")

module.exports = {
	name: 'update',
	description: 'Updates event data',
	execute(message, _args) {
        message.reply("Starting Update");
        (async()=>{
          await updateAll()
        message.reply("update completed")
        })()
	},
};