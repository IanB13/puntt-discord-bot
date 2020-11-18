const Events = require("../models/Event")
const Discord = require('discord.js');

module.exports = {
	name: 'events',
	description: 'displays events',
	execute(message, args ) {
    
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Some title') 
            console.log("in")
            message.channel.send(exampleEmbed)
	},
};