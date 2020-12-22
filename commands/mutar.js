const Discord = require('discord.js')
module.exports = {
    name: 'mutar',
    description: 'Muta a pessoa mencionada.',
    execute(message, args) {
     let member = message.mentions.members.first()
     let embed = new Discord.MessageEmbed()
     const mutedRole = message.guild.roles.cache.find(r => r.name === 'mutado')
     if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
        embed.setTitle(':x: Sem permissões o suficiente.')
        embed.setDescription('')
        message.reply(embed)
        return;
    }
     if (!member) {
        embed.setTitle(':x: Argumentos não Especificados.')
        embed.setDescription('Tente: `k!mutar @enix`')
        message.reply(embed)
        return;
     }
     embed.setTitle(':white_check_mark: '+member.user.username+' foi mutado.')
     embed.setDescription('')
     message.reply(embed)
     member.roles.add(mutedRole)
    }
}