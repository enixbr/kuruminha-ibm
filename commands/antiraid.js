const Discord = require('discord.js')
let raidMode = false;

module.exports = {
    name: 'antiraid',
    description: 'Ativa cooldown em todos os canais.',
    execute(message, args) {
    const embed = new Discord.MessageEmbed()
        if (raidMode == false) {
        raidMode = true;
        embed.setTitle(':white_check_mark: Modo Anti-Raid Ativado.')
        message.reply(embed)
        message.guild.channels.cache.forEach(myChann => {
        if (myChann.type === "text") {
            myChann.setRateLimitPerUser(60)
        }
        })

      } else if (raidMode == true) {
        raidMode = false;
        embed.setTitle(':x: Modo Anti-Raid Desativado.')
        message.reply(embed)
        message.guild.channels.cache.forEach(myChann => {
            if (myChann.type === "text") {
             myChann.setRateLimitPerUser(0)
            }
        })

     }
   }
}