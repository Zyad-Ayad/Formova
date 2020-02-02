const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {

    if (!args[0]) return message.channel.send(":x: ERROR : Please insert full information\n\nExample : ``.fortnite [platform] [Epic-Nickname]``")

    

        if(args[0] !== "pc" && args[0] !== "xbl" && args[0] !== "psn") return message.channel.send(":x: ERROR : ``" + args[0] + "`` is not a vail platform\n\nPlatforms : ``pc`` ``xbl`` ``psn``\n\nExample : ``.fortnite [platform] [Epic-Nickname]``")


        if (!args[1]) return message.channel.send(":x: ERROR : Please insert your Epic-Nickname\n\nExample : ``.fortnite [platform] [Epic-Nickname]``")

        let url = "https://api.fortnitetracker.com/v1/profile/" + args[0] + "/" + args[1]
    
    fetch(url, {
        method : "GET",
        headers: {
            "TRN-Api-Key" : process.env.TRN_api_key
        }

    })
    .then(res => res.json())
    .then(json => {
        
        if(!(json.accountId)) return message.channel.send(":x: ERROR : Wrong Epic-Nickname")

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
