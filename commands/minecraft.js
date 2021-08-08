const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
    
    


//ERRRRORRRRS

const nameError = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle("CMD ERROR")
.addField(":x: ERROR", "Formova can't find ``" + args[0] + "`` in mojang files")
.addField("Usage", "``.minecraft [username]``")
.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');



const dataError = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle("CMD ERROR")
.addField(":x: ERROR", "Please insert full data")
.addField("Usage", "``.minecraft [username]``")
.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');




if (!args[0]) return message.channel.send(dataError);




let uuid = await fetch("https://api.mojang.com/users/profiles/minecraft/" + args[0]).then( response => {
    if (!response.ok) { 
        throw response 
    }
    return response.json()  //we only get here if there is no error
  })
  .then( json => json)
  .catch( err => {
   
      

  })

if (!uuid) return message.channel.send(nameError)

let nameHistory = await fetch("https://api.mojang.com/user/profiles/" + uuid.id + "/names").then(res => res.json())


var names = "";

for(let i = 1; i <= nameHistory.length; i++) {

    if (!names) { var names = i + "- ``" + nameHistory[i-1].name + "``  [Main Name]"
} else {

    var ts = new Date(nameHistory[i-1].changedToAt);

    var names = names + "\n\n" + i + "- ``" + nameHistory[i-1].name + "``  Changed AT " + `[${ts.toLocaleString()}]`
}
}



const stats = new Discord.MessageEmbed()

.setColor('#0099ff')
.setImage("https://mc-heads.net/body/" + uuid.id)
.setTitle(args[0] + " Stats")
.addField("Names History", names)
.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');

message.channel.send(stats)











}

module.exports.help = {
    name: "minecraft"
}
