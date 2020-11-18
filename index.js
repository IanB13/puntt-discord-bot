require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const mongoose = require("mongoose")
const scrapeEvents = require("./utils/scrapeEvents")
bot.login(TOKEN);

 const uri =  process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true  }).then(() => {
  console.log(`connected at ${uri}`)
}
).catch( error => {
  console.error(error)
}); 


bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (!msg.author.bot) {
    // Do something if message doesn't come from a bot.

    if (msg.content === 'ping') {
      console.log('pinged')
      msg.reply('pong');
      msg.channel.send('pong');

    }
    else if (msg.content.startsWith('!kick')) {
      if (msg.mentions.users.size) {
        const taggedUser = msg.mentions.users.first();
        msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
      }
    }
    else if (msg.content === 'update') {

      msg.reply("Starting Scrape");
      (async()=>{
        console.log("in asc")
        const events = await scrapeEvents()
        console.log( events)
      })()

    }
  }

});

