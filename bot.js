const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const fetch = require("node-fetch");





//Test commit


//Basic

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("formova in " + client.guilds.cache.size + " servers");
    client.user.setActivity(".help | [.serverinfo] New commands");
  });




  
  




















  client.on("guildCreate", async guild => {


    fetch("https://top.gg/api/bots/606872086601793557/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json", 
    "Authorization": process.env.topggg_token },
    body: JSON.stringify({ "server_count": client.guilds.cache.size })
  })
 .then(res => res.json()) // expecting a json response
 .then(json => console.log("Server count updated"));

  let owner = await guild.fetchOwner().then(owner => owner.user)
    owner.send("Hello **" + owner.username + "**, \n\nYou or someone else just added me to **" + guild.name + "** \n\nto start using my commands do ``.help``\n\nThank you, have a good day \n\nCommands will never work in DM")


  
  });





  client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

  console.log(file + ": Loaded.")
  client.commands.set(command.help.name, command);
}


//---------------------------------------------------
var prefix = (".");



client.on('messageCreate', async message => {
if (message.author.bot) return;    
  if (message.channel.type == 'dm') return;  

  if (message.mentions.has(client.user.id)) {

    if (message.content.includes("@here") || message.content.includes("@everyone")) return;

    if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;

    message.channel.send(`Hi, im here\n\ndo \`\`${prefix}help\`\` to start`)
  }



  
  if(!message.content.startsWith(prefix))return;


  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let cmd = client.commands.get(command.slice(prefix.length));
  if (cmd) {
 
  if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return message.author.send("I don't have `SEND_MESSAGES` permission in " + message.channel.name);

  cmd.run(client, message, args);
  console.log("(" + command + ") command just used in " + message.guild.name + " server")

}
});


client.login(process.env.bot_token);
