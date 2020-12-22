const Discord = require('discord.js')
module.exports = {
    name: 'limpar',
    description: 'Limpa o número de mensagens especificado.',
    execute(message, args) {
    const embed = new Discord.MessageEmbed()
     if (!args[0]) {
         embed.setTitle(':x: Argumentos não Especificados.')
         embed.setDescription('Tente: `k!limpar 1`')
         message.reply(embed)
         return;
     }
     if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
        embed.setTitle(':x: Sem permissões o suficiente.')
        embed.setDescription('')
        message.reply(embed)
        return;
    }
     message.channel.bulkDelete(parseInt(args[0]))
     embed.setTitle(':white_check_mark: '+args[0]+' mensagens deletadas.')
     message.channel.send(embed)
    }
}