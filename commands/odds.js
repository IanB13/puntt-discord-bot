const Events = require("../models/Event")
const Discord = require('discord.js');

const nextMatch = async () =>{
    const next = await Events.find().sort({dateTime: 1}).limit(1)

    const msg = oddsMsg(next[0].odds[0]) //TODO: determine which one to use
    return msg
}

const findMatch = async (args) =>{
    const match = await Events.find({name: new RegExp(args[0], 'i') })
    let msg = ["Match not found, try something else"]
    if(match.length !== 0){
     msg = oddsMsg(match[0].odds[0])
    }
    return msg
   
}

const oddsMsg = (odds) =>{
    const {players,type,link} = odds

    const teams = players
        .map(player => player.team)
        .filter((item,index,array) => array.indexOf(item) === index )
 
    //do to length concerns need to break into teams
    
    const teamMessages = teams.map( (team)=> {
        const teamPlayers = players.filter(player=> player.team === team)
        const msg = new Discord.MessageEmbed()
            .setColor('#14ecd2')
            .setTitle(team)
            .setDescription(type)
            .setURL(link)
            .setThumbnail('https://puntt.gg/images/puntt-logo-white.svg')
            .setImage('https://puntt.gg/images/puntt-logo-white.svg')
        for (const player of teamPlayers) {
            const { player: name, AI, probBet } = player
            msg
                .addField(name,'\u200B', true)
                .addField('Bet:', "AI:", true)
                .addField(`£${probBet}`, AI, true)
        }  
        return msg
    })
    
    return teamMessages
}


module.exports = {
	name: 'odds',
	description: 'displays odds',
	execute(message, args ) {
            ( async ()=>{
                if(args.length === 0){
                    message.channel.send(`Follow !!odds with a command eg. !!odds next or !!odds <EventName>`)
                    return;
                }
                else if(args.includes("next")){
                    const msgs = await nextMatch()
                    for(const msg of msgs){
                        message.channel.send(msg)
                    }
                }
                else{
                    const msgs = await findMatch(args)

                    for(const msg of msgs){
                        message.channel.send(msg)
                    }
                }
            })()

	},
};
