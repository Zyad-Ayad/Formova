const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

        var list = "";


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./${file}`);

            if (!list) {

                var list = `\`\`${command.help.name}\`\`  :  ${command.help.help}\nUsage : ${command.help.usage}`

            } else {

                var list = list + `\n\n\`\`${command.help.name}\`\`  :  ${command.help.help}\nUsage : ${command.help.usage}`

            }

}







		const commands = new Discord.MessageEmbed()

		.setColor('#0099ff')
		.setTitle("Formova commands | prefix is `.`")
		.addField("Commands list", list)
		.addField("NOTE :", "`[]` is required & `{}` is optinal")
		.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');
		
		message.channel.send({ embeds: [commands] })
	


	
    



}

module.exports.help = {
	name: "help",
	help: "Bot commands",
	usage: ".help"
}
