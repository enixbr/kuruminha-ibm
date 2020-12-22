const Discord = require('discord.js')
module.exports = {
    name: 'desmutar',
    description: 'Desmuta a pessoa mencionada.',
    execute(message, args) {
     let member = message.mentions.members.first()
     let embed = new Discord.MessageEmbed()
     if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
        embed.setTitle(':x: Sem permissões o suficiente.')
        embed.setDescription('')
        message.reply(embed)
        return;
    }
     const mutedRole = message.guild.roles.cache.find(r => r.name === 'mutado')
     if (!member) {
        embed.setTitle(':x: Argumentos não Especificados.')
        embed.setDescription('Tente: `k!desmutar @enix`')
        message.reply(embed)
        return;
     }
     if (!member.roles.cache.find(r => r.name === "mutado")) {
         embed.setTitle(':x: Esta pessoa não está mutada.')
         embed.setDescription('')
         message.reply(embed)
         return;
     }
     embed.setTitle(':white_check_mark: '+member.user.username+' foi desmutado.')
     embed.setDescription('')
     message.reply(embed)
     member.roles.remove(mutedRole)
    }
}