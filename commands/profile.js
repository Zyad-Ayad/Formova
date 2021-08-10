const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    let target = message.mentions.members.first() || message.member;


    var creatTs = new Date(target.user.createdTimestamp);
    var joinTs = new Date(target.joinedTimestamp)




    const info = new Discord.MessageEmbed()

    .setColor('#0099ff')
	.setTitle("User info")
    .setThumbnail(target.user.avatarURL())
    .addFields(
        { name: "want to know more about " + target.user.username + "?", value: "\u200B", inline: false },
		{ name: 'Username#Discriminator', value: target.user.tag, inline: true },
        { name: "user ID", value: target.user.id.toString(), inline: true},
		{ name: 'Joined discord at', value: creatTs.toLocaleString("en-GB",{ hour12: true}), inline: false },
        { name: "Joined Server at", value: joinTs.toLocaleString("en-GB", { hour12: true}), inline: true},
        { name: "Highest role", value: target.roles.highest.name, inline: true},
	)
	.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');
    
    message.channel.send({ embeds: [info] })



    

}

module.exports.help = {
    name: "profile"
}
