const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");


client.commands = new Discord.Collection();
const talkedRecently = new Set();


let prefix = (".");


fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load");
        return;
    }

    console.log("loading " + jsfiles.length + " commands!");

    jsfiles.forEach((f, i) => {
        let props = require("./commands/" + f);
        console.log(i + 1 + " : " + f + " loaded")
        client.commands.set(props.help.name, props);
    })

});

//---------------------------------------------------



client.on('message', message => {
  if (message.channel.type == 'dm' && message.content.startsWith(".help")) return message.channel.send("Don't use bot commands here, use servers instead")
  if (message.channel.type == 'dm') return;    

  if(!message.content.startsWith(prefix))return;
if (message.author.bot) return;    
if (talkedRecently.has(message.author.id)) {
  message.channel.send("The next user have to wait at least 3 secounds between using commands : " + message.author + "\nthe cooldown won't work for who have **ADMINSTRATOR** permission")
   .then(message => {
   message.delete(3000)
})
} else {

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let cmd = client.commands.get(command.slice(prefix.length));
  if (cmd) { cmd.run(client, message, args);
  console.log("(" + command + ") command just used in " + message.guild.name + " server")
if (!message.member.hasPermission("ADMINISTRATOR")){
  talkedRecently.add(message.author.id);
}
setTimeout(() => {
// Removes the user from the set after 5 sec
talkedRecently.delete(message.author.id);
}, 3000);
}
}
});












client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.bot_token);
