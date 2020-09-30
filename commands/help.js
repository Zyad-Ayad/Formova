const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports.run = async (client, message, args) => {



	fs.readdir("./commands/", (err, files) => {
		if(err) console.error(err);
	
		let jsfiles = files.filter(f => f.split(".").pop() === "js");

        var list = "";
        
		for (let i = 1; i <= jsfiles.length; i++) {

            if (!list) {

                var list = "``." + jsfiles[i-1].split(".")[0] + "``"

            } else {

                var list = list + " \n\n``." + jsfiles[i-1].split(".")[0] + "``"

            }

        }


		const stats = new Discord.RichEmbed()

		.setColor('#0099ff')
		.setTitle("Formova commands")
		.addField("Commands list", list)
		.addField("NOTE :", "use the command once to know how to use it")
		.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');
		
		message.channel.send(stats)
	


	
    })



}

module.exports.help = {
	name: "help",
}
