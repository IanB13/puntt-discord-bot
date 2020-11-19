const Discord = require('discord.js');
const config = require('./utils/config')
const mongoose = require("mongoose")
const fs = require('fs');

const bot = new Discord.Client();
const TOKEN = config.DISCORD_TOKEN; 
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}


bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

const prefix = config.prefix

bot.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }

});

const uri =  config.MONGODB_URI 
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true  }).then(() => {
  console.log(`connected at ${uri}`)
}
).catch( error => {
  console.error(error)
}); 


bot.login(TOKEN);
