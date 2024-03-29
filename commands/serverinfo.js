const Discord = require("discord.js");


module.exports.run = async (client, message, args) => {

    var catN = 0;
    var textN = 0;
    var voiceN = 0;

    var creatTs = new Date(message.guild.createdTimestamp);

    creatTs.toLocaleString("en-GB",{ hour12: true})

    let time = (creatTs.toLocaleString("en-GB",{ hour12: true})).split(",")[0]

    let owner = await message.guild.fetchOwner().then(owner => owner.user)

    let channels1 = await message.guild.channels.fetch()
    let channels = Array.from(channels1)

    for (let i in channels) {

        if (channels[i][1].type === "GUILD_CATEGORY") catN = catN + 1
        if (channels[i][1].type === "GUILD_TEXT") textN = textN + 1
        if (channels[i][1].type === "GUILD_VOICE") voiceN = voiceN + 1


    }

    var rulesChannel = ''
    var sysChannel = ''

    if (!message.guild.rulesChannel) {

        rulesChannel = "Not found"
 
     } else {
        rulesChannel = message.guild.rulesChannel
     }
     if (!message.guild.systemChannel) {

        sysChannel = "Not found"
 
     } else {
        sysChannel = message.guild.systemChannel
     }


     let bigspace = "\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B"

     let emo = await message.guild.emojis.fetch().then(emojis => emojis.size)

     var features = "";



     if (message.guild.features.length < 1) {

        features = "No features!"

     } else {
     for (let i in message.guild.features) {

        if (!features) {

            features = `(${message.guild.features[i]})`
        } 
        else {

        features = features + "- - (" + message.guild.features[i] + ")"

        }
     }
    }
    const info = new Discord.MessageEmbed()

    .setColor('#0099ff')
	.setTitle("Server info")
    .setThumbnail(message.guild.iconURL())
    .addField("Name", message.guild.name, true)
    .addField(bigspace, bigspace, true)
        //{ name: "\u200B" , value: "\u200B", inline: true },
    .addField("Owner", ":crown:" + owner.tag, true)
    .addField("Created At", ":calendar_spiral:" + time, true)
    .addField(bigspace, bigspace, true)
    .addField("Members count", "This server has ``" + message.guild.memberCount.toString() + "`` members", true)
    .addField("Channels", "Categories :ledger: : "+ catN + "\nText channels :keyboard: : " + textN+"\nVoice channels :loud_sound: : " + voiceN, true)
    .addField("Rules channel", `${rulesChannel}`, true)
    .addField('System channel', `${sysChannel}`, true)
    .addField("Server Emojis", ":grin: ``" + emo.toString() + "``", true)
    .addField("Features", `\`\`\`-${features}\`\`\``)
    .setImage(message.guild.bannerURL({size: 2048}))
	.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');
    
    message.channel.send({ embeds: [info] })

    





}

module.exports.help = {
    name: "serverinfo",
    help: "get current server info",
    usage: ".serverinfo"
}
