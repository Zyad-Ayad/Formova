const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");


module.exports.run = async (client, message, args) => {

   let binfo = await fetch("https://top.gg/api/bots/606872086601793557", {
    method: "GET",
    headers: {"Authorization": process.env.topggg_token },
})
.then(res => res.json())

let votes = await fetch("https://top.gg/api/bots/606872086601793557/votes", {
    method: "GET",
    headers: {"Authorization": process.env.topggg_token },
})
.then(res => res.json())


let Author = client.users.cache.get("269132764576481282")

    const info = new Discord.MessageEmbed()

    .setColor('#0099ff')
	.setTitle("Bot info")
    .setURL('https://discord.com/oauth2/authorize?client_id=606872086601793557&scope=bot&permissions=8')
    .setThumbnail(client.user.avatarURL())
    .addFields(
		{ name: 'Username#Discriminator', value: binfo.username + "#" + binfo.discriminator, inline: true },
        { name: "\u200B" , value: "\u200B", inline: true },
		{ name: 'prefix', value: `\`\`${binfo.prefix}\`\``, inline: true },
        { name: "Library", value: binfo.lib, inline: true},
        { name: "Client ID", value: binfo.id, inline: true},
		{ name: 'Author', value: Author.tag, inline: true},
        { name: "Last vote", value: votes[0].username, inline: true},
        { name: "Vote link", value: "[Vote](https://top.gg/bot/606872086601793557/vote)", inline: true},
        { name: "Invite link", value: "[invite](https://discord.com/oauth2/authorize?client_id=606872086601793557&scope=bot&permissions=8)", inline: true}
	)
	.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');
    
    message.channel.send({ embeds: [info] })


}

module.exports.help = {
    name: "info",
    help: "Bot information",
    usage: ".info"
}
