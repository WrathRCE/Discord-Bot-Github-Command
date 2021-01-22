const Discord = require("discord.js"),
fetch = require('node-fetch');

module.exports = {
    name: "github",
    category: "Utility",
    description: "",
    run: async (client, message, args) => {
      let user = !args[0] ? "KSJaay" : args[0];
      let repo = !args[1] ? "Alita" : args[1];
      let uri = await fetch(`https://api.github.com/repos/${user}/${repo}`);
      if(uri.status === 200){
        let uriJson = await uri.json();
        let embed = new Discord.MessageEmbed()
        .setAuthor(uriJson.owner.login, uriJson.owner.avatar_url)
        .setDescription(`${uriJson.description}\n[Repository Link](${uriJson.html_url})\n`)
        .addField("Repo Name :notepad_spiral:", `${uriJson.name}`, true)
        .addField("Stars :star:", `${uriJson.stargazers_count}`, true)
        .addField("Forks :gear:", `${uriJson.forks}`, true)
        .addField("Language :desktop:", `${uriJson.language}`, true)
        .setImage(uriJson.owner.avatar_url)
        .setColor("RANDOM")
        return message.channel.send(embed)
      }else{
        return message.channel.send("Unable to find the mentioned repository. Please make sure you have entered the correct user/repository. `!github [user] [repository]`")
      }
    },
};