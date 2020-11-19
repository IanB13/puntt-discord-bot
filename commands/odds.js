const Events = require("../models/Event")
const Discord = require('discord.js');

module.exports = {
	name: 'odds',
	description: 'displays odds',
	execute(message, args ) {
            ( async ()=>{
                
                message.channel.send("odds are")
                console.log(args)
            })()

	},
};

const getOdds =() => {


}