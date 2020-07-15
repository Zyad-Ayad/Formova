const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {


    const invite = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle("Formova Invite Link")
    .addField("Invite URL", "[Formova](https://discord.com/oauth2/authorize?client_id=606872086601793557&scope=bot&permissions=8)")
    .addField("top.gg URL", "[top.gg/formova](https://top.gg/bot/606872086601793557)")
	.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');

message.channel.send(invite);



}


module.exports.help = {
    name: "invite"
}