const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {

let apiToken = process.env.riot_token;
//ERRRRORRRRS

    const regionError = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle("CMD ERROR")
    .addField(":x: ERROR", "``" + args[0] + "`` is not a valid region")
    .addField("Usage", ".league [``Region``] [``Summoner name``]")
    .addField("Valid regions", "``eune``  ``na`` ``euw`` ``br`` ``kr`` ``jp`` ``tr`` ``ru`` ``oce`` ``las`` ``lan``")
    .setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');




    const dataError = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle("CMD ERROR")
    .addField(":x: ERROR", "Please insert full data")
    .addField("Usage", ".league [``Region``] [``Summoner name``]")
    .addField("Valid regions", "``eune``  ``na`` ``euw`` ``br`` ``kr`` ``jp`` ``tr`` ``ru`` ``oce`` ``las`` ``lan``")
    .setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');






    var region = "";
    if (!args[0]) {

        return message.channel.send({embeds: [dataError]})

    } else if (args[0] === "euw") {

        var region = "euw1"

    } else if (args[0] === "na") {

        var region = "na1"

    } else if (args[0] === "eune") {

        var region = "eun1"
    } else if (args[0] === "br") {

        var region = "br1"
    } else if (args[0] === "jp") {

        var region = "jp1"
    } else if (args[0] === "kr") {

        var region = "kr"
    } else if (args[0] === "lan") {

        var region = "la1"
    } else if (args[0] === "las") {

        var region = "la2"
    } else if (args[0] === "oce") {

        var region = "oc1"
    } else if (args[0] === "tr") {

        var region = "tr1"
    } else if (args[0] === "ru") {

        var region = "ru"
    } else return message.channel.send({embeds: [regionError]});



    if (!args[1]) return message.channel.send({embeds: [dataError]})

    


    const nameError = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle("CMD ERROR")
    .addField(":x: ERROR", "Formova can't find ``" + message.content.slice(9 + args[0].length) + "`` in ``" + args[0] + "`` region")
    .addField("Usage", ".league [``Region``] [``Summoner name``]")
    .addField("Valid regions", "``eune``  ``na`` ``euw`` ``br`` ``kr`` ``jp`` ``tr`` ``ru`` ``oce`` ``las`` ``lan``")
    .setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');


    let summoner = await fetch("https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" +(message.content.slice(9 + args[0].length).replace(" ", "+")), {
        method : "GET",
        headers : {
            "X-Riot-Token": apiToken,
        }
    })
    .then(res => res.json())




    if(!summoner.id) return message.channel.send({embeds: [nameError]})




    let ranked = await fetch("https://" + region + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + summoner.id, {
        method : "GET",
        headers : {
            "X-Riot-Token": apiToken
        }
    })
    .then(res => res.json())

var rank = '';
    
    for(let i in ranked){

        let key = ranked[i].queueType

        if (key == 'RANKED_SOLO_5x5') {

            var rank = ranked[i]
            break;

        }

    }



if (!rank) {
    var rank1 = "Not Ranked"
    var rank2 = "Not Ranked"
} else {
    var rank1 = rank.tier + " " + rank.rank;
    var rank2 = rank.wins + "/" + rank.losses;
}



let champs = await fetch("https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summoner.id, {
    method : "GET",
    headers : {
        "X-Riot-Token": apiToken
    }
})
.then(res => res.json())






let version = (await fetch("https://ddragon.leagueoflegends.com/api/versions.json").then(res => res.json()))[0];






let champids = (await fetch("http://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/champion.json").then(res => res.json()))

var champ1stats = "No champions";
var champ2stats = "No champions";
var champ3stats = "No champions";

if (champs[2]) {
    let champ1ID = champs[0].championId
    let champ2ID = champs[1].championId
    let champ3ID = champs[2].championId
    


var champ1 = "";

    for(let i in champids.data){

        let key = champids.data[i].key

        if (key == champ1ID) {

            var champ1 = champids.data[i]
            break;

        }

    }


    if (champ1) {

        var champ1stats =  "1- " + champ1.name + " [``LVL :" + champs[0].championLevel + " / Points : " + champs[0].championPoints + "``]"
    }

    var champ2 = "";

    for(let i in champids.data){

        let key = champids.data[i].key

        if (key == champ2ID) {

            var champ2 = champids.data[i]
            break;

        }

    }

    if (champ2) {

          var champ2stats =  "2- " + champ2.name + " [``LVL :" + champs[1].championLevel + " / Points : " + champs[1].championPoints + "``]"
      }
  

    var champ3 = "";

    for(let i in champids.data){

        let key = champids.data[i].key

        if (key == champ3ID) {

            var champ3 = champids.data[i]
            break;

        }

    }

    if (champ3) {

          var champ3stats =  "3- " + champ3.name + " [``LVL :" + champs[2].championLevel + " / Points : " + champs[2].championPoints + "``]"
      }
  

}


    let activeGame = await fetch("https://" + region + ".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + summoner.id, {
        method : "GET",
        headers : {
            "X-Riot-Token": apiToken
        }
    })
    .then(res => res.json())

    
    var activeGameStats = "``" + message.content.slice(9 + args[0].length) + "`` is not active in the moment"

    if (activeGame.gameId) {

      var activeChampion = "";

        for(let i in activeGame.participants){
    
            let summName = activeGame.participants[i].summonerName

    
            if (summName == summoner.name) {


                for(let a in champids.data){

                    let key = champids.data[a].key
            
                    if (key == activeGame.participants[i].championId) {

                        let gameTimeMin = Math.floor(activeGame.gameLength / 60);
                        var gameTimeSec = activeGame.gameLength - gameTimeMin * 60;


                        let matchTime = gameTimeMin + ":" + gameTimeSec
            
                        var activeChampion = champids.data[a].name
                        var activeGameStats = message.content.slice(9 + args[0].length) + " is Playing as ``" + activeChampion + "``\nMatch time : ``" + matchTime + "``" 
                        break;
            
                    }
            
                }
    
            }
    
        }


    }






// LAST GAME STATUS --------------------------------------------------



let matchesList = await fetch("https://"+ region + ".api.riotgames.com/lol/match/v4/matchlists/by-account/" + summoner.accountId, {
    method : "GET",
    headers : {
        "X-Riot-Token": apiToken
    }
})
.then(res => res.json())





let lastMatchId = matchesList.matches[0].gameId;






let LastMatch = await fetch("https://" + region + ".api.riotgames.com/lol/match/v4/matches/" + lastMatchId, {
    method : "GET",
    headers : {
        "X-Riot-Token": apiToken
    }
})
.then(res => res.json())



var participantId = "";

for(let i in LastMatch.participantIdentities){

    let key = LastMatch.participantIdentities[i].player.accountId

    if (key == summoner.accountId) {

        var participantId = LastMatch.participantIdentities[i].participantId
        break;

    }

}



var lastMatchChamp = ''


for(let i in champids.data){

    let key = champids.data[i].key

    if (key == LastMatch.participants[participantId - 1].championId) {

        var lastMatchChamp = champids.data[i].name
        break;

    }

}
var WLStats
if ((LastMatch.participants[participantId - 1].stats.win) == false) {
    var WLStats = "Defeat - Loss"
} else if (LastMatch.participants[participantId - 1].stats.win == true) {
    var WLStats = "Victory - Win"
}




let score = LastMatch.participants[participantId - 1].stats.kills + "/" + LastMatch.participants[participantId - 1].stats.deaths + "/" + LastMatch.participants[participantId - 1].stats.assists



let LastGameStats = "Stats : **" + WLStats + "**\nLane -- (role) : **" + matchesList.matches[0].lane + "** -- ( **" + matchesList.matches[0].role + "** ) \nChampion : **" + lastMatchChamp +"**\nScore ``" + score + "``"











    const stats = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(message.content.slice(9 + args[0].length) + " Stats" )
	.setThumbnail("http://ddragon.leagueoflegends.com/cdn/" + version + "/img/profileicon/" + summoner.profileIconId + ".png")
    .addField('Rank', rank1, true)
	.addField('Wins/Losses', rank2, true)
    .addField('Summoner level', summoner.summonerLevel.toString(), true)
    .addField('\u200B', '\u200B')
    .addField('Most Played Champion', champ1stats, true)
    .addField('Second Played Champions', champ2stats)
    .addField('Third Played Champion', champ3stats)
    .addField('\u200B', '\u200B')
    .addField("Last Match", LastGameStats)
    .addField("Active stats", activeGameStats)
	.setFooter('Formova', 'https://g.top4top.io/p_14877vn8y1.jpg');

message.channel.send({embeds: [stats]});


}

module.exports.help = {
    name: "league",
    help: "League OF Legends account stats",
    usage: ".league [Region] [Summoner name]"
}
