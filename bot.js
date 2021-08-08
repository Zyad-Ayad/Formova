const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_API_KEY, client);







client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(".help");
});



client.on("message", message => {
  if (message.content.includes("@here") || message.content.includes("@everyone")) return;

  if (message.mentions.has(client.user.id)) {
    message.channel.send("Hi, im here\n\ndo ``.help`` to start")
  };


  
})


client.on("guildCreate", guild => {

  dbl.postStats(client.guilds.size)

  guild.owner.send("Hello **" + guild.owner.user.username + "**, \n\nYou or someone else just added me to **" + guild.name + "** \n\nto start using me do ``.help`` or mention me \n\nThank you, have a good day \n\nCommands will never work in DM")


})



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





client.login(process.env.bot_token);
