const Events = require("../models/Event")
const Discord = require('discord.js');

module.exports = {
	name: 'matches',
	description: 'displays events',
	execute(message, args ) {
            ( async ()=>{
                const eventsEmbed = new Discord.MessageEmbed()
                    .setColor('#14ecd2')
                    .setTitle('Matches')
                    .setURL("https://puntt.gg/matches")
                const events = await Events.find()
                const fithDate = events[4].dateTime
                const firstFiveEvents = events.filter(event=> event.dateTime <= fithDate)
                for(const event of firstFiveEvents){
                    const {name, tournament,dateTime} = event 

                    eventsEmbed
                        .addField(name, tournament,true)
                        .addField("Starts at:", dateTime,true )
                        .addField('\u200B','\u200B', true)
                }   

                eventsEmbed.setFooter
                message.channel.send(eventsEmbed)
                
            })()

	},
};