require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const mongoose = require("mongoose")
const scrapeEvents = require("./utils/scrapeEvents")
const fs = require('fs');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

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

const prefix = '!!' // TODO: put in config

bot.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
 
    // Do something if message doesn't come from a bot.
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'ping') {
      bot.commands.get('ping').execute(msg, args);
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

});

bot.login(TOKEN);
