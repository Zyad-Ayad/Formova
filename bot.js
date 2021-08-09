const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const fetch = require("node-fetch");








//Basic

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("formova in " + client.guilds.cache.size + " servers");
    client.user.setActivity(".help");
  });




  
  




















  client.on("guildCreate", guild => {




    guild.members.fetch(guild.ownerId).then(owner =>{

    owner.user.send("Hello **" + owner.user.username + "**, \n\nYou or someone else just added me to **" + guild.name + "** \n\nto start using my commands do ``.help``\n\nThank you, have a good day \n\nCommands will never work in DM")

    })

  
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


  if (message.mentions.has(client.user.id)) {

    if (message.content.includes("@here") || message.content.includes("@everyone")) return;

    message.channel.send(`Hi, im here\n\ndo \`\`${prefix}help\`\` to start`)
  }



  if (message.channel.type == 'dm' && message.content.startsWith(".help")) return message.channel.send("Don't use bot commands here, use servers instead")
  if (message.channel.type == 'dm') return;  
  
  if(!message.content.startsWith(prefix))return;
if (message.author.bot) return;    

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let cmd = client.commands.get(command.slice(prefix.length));
  if (cmd) {
 
    
  cmd.run(client, message, args);
  console.log("(" + command + ") command just used in " + message.guild.name + " server")

}
});

client.login(proccess.env.bot_token);
