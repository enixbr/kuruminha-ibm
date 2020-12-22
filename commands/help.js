const fs = require('fs')
const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: 'Exibe a lista de comandos.',
    execute(message, args) {
    const totalCommands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

    const embed = new Discord.MessageEmbed()
    embed.setTitle(`Kuruminha - ${totalCommands.length} Comandos`)
    embed.addField(':baby_symbol: Membros','`ping` `help`',true)
    embed.addField(':beginner: Staff','`antiraid` `mutar` `desmutar` `limpar`',true)
    message.reply(embed)
    }
}