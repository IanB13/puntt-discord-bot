require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN; // TODO: put in config
const mongoose = require("mongoose")

const fs = require('fs');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

const uri =  process.env.MONGODB_URI // TODO: put in config

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



bot.login(TOKEN);
