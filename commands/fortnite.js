const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
    


//ERRRRORRRRS

const regionError = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle("CMD ERROR")
.addField(":x: ERROR", "``" + args[0] + "`` is not a valid platform")
.addField("Usage", "``.fortnite [platform] [Epic-Nickname]``")
.addField("Valid platforms", "``pc`` ``xbl`` ``psn``")
.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');



const nameError = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle("CMD ERROR")
.addField(":x: ERROR", "Formova can't find ``" + args[1] + "`` in ``" + args[0] + "`` region")
.addField("Usage", "``.fortnite [platform] [Epic-Nickname]``")
.addField("Valid platform", "``pc`` ``xbl`` ``psn``")
.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');



const dataError = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle("CMD ERROR")
.addField(":x: ERROR", "Please insert full data")
.addField("Usage", "``.fortnite [platform] [Epic-Nickname]``")
.addField("Valid platform", "``pc`` ``xbl`` ``psn``")
.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');







    if (!args[0]) return message.channel.send(dataError)

    

        if(args[0] !== "pc" && args[0] !== "xbl" && args[0] !== "psn") return message.channel.send(regionError)


        if (!args[1]) return message.channel.send(dataError)

        let url = "https://api.fortnitetracker.com/v1/profile/" + args[0] + "/" + args[1]
    
    fetch(url, {
        method : "GET",
        headers: {
            "TRN-Api-Key" : process.env.TRN_api_key
        }

    })
    .then(res => res.json())
    .then(json => {
        
        if(!(json.accountId)) return message.channel.send(nameError)

        const stats = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle(args[1] + " stats")
	.setAuthor('fortnite stats', 'https://www.freeiconspng.com/uploads/fortnite-logo-graphic-design-25.png')
	.addField(json.lifeTimeStats[7].key, json.lifeTimeStats[7].value)
	.addField(json.lifeTimeStats[8].key, json.lifeTimeStats[8].value)
	.addField(json.lifeTimeStats[9].key, json.lifeTimeStats[9].value)
    .addField(json.lifeTimeStats[10].key, json.lifeTimeStats[10].value)
    .addField(json.lifeTimeStats[11].key, json.lifeTimeStats[11].value)
	.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');

message.channel.send(stats);
    });


}

module.exports.help = {
    name: "fortnite"
}
