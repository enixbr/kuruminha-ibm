const Discord = require('discord.js')
const Client = new Discord.Client()
const Prefix = 'k!'

const fs = require('fs')

Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    Client.commands.set(command.name, command)
}

Client.on('ready', () => {
    console.log('Kuruminha is Ready!')
    console.log(`${commandFiles.length} commands loaded!`)
})

const NO = ['discord.gg','https://discord.gg','http://discord.gg','discord.gg/','https://discord.gg/','http://discord.gg/',
'd i s c o r d . g g','h t t p s : / / d i s c o r d . g g','h t t p : / / d i s c o r d . g g',
'd i s c o r d . g g /','h t t p s : / / d i s c o r d . g g /','h t t p : / / d i s c o r d . g g /']

function findWord(word, str) {
    return str.split(' ').some(function(w){return w === word})
}

Client.on('message', message => {

    NO.forEach(NOO => {
        var gay = findWord(NOO, message.content)
        if (gay == true) {
            try {
            message.channel.send(':warning: O Usuário '+message.author.username+' está divulgando um servidor de discord!')
            message.delete() } catch (err) { return; }
        }
     })

     if (message.channel.id == "790231316926038027") {
        message.react('👍')
        message.react('👎')
        message.react('🤷')
    }

    if (!message.content.startsWith(Prefix) || message.author.bot) return;
    const embed = new Discord.MessageEmbed();

    var logChannel = message.guild.channels.cache.find(channels => channels.name == 'log');

    try {

    let args = message.content.slice(Prefix.length).split(/ +/)
        command = args.shift().toLowerCase();

    let commandList = ['help','ping','limpar','mutar','desmutar','antiraid']

    commandList.forEach(calledCommand => {
        if (command == calledCommand) {
         Client.commands.get(`${calledCommand}`).execute(message, args)
         embed.setTitle(`:exclamation: Comando usado: ${calledCommand} | Por: ${message.author.username}`)
         logChannel.send(embed)
        }
    })

    } catch (err) {
        embed.setTitle(':warning: O Bot encontrou um erro.')
        embed.setDescription(err.toString())
        logChannel.send(embed)
    }

})

Client.on('messageUpdate', function(oldMessage, newMessage) {
    var logChannel = newMessage.guild.channels.cache.find(channels => channels.name == 'log');
    if (newMessage.channel == '790745323865374720') return;
    if(newMessage.content == oldMessage.content) return;
    if (newMessage.author.bot) return;
    const msg = new Discord.MessageEmbed()
    .setColor(0xfce303)
    .setTitle(`:exclamation: Mensagem Editada | ${newMessage.channel.name}`)
    .addField(`Antes`,`${oldMessage}`,true)
    .addField('Autor da Mensagem', '<@'+newMessage.author+'>',true)
    .addField(`Depois`,`${newMessage}`)
    .setTimestamp()
     logChannel.send(msg)
})

Client.on('messageDelete', function(message) {
    var logChannel = message.guild.channels.cache.find(channels => channels.name == 'log');
    if (message.channel == '790745323865374720') return;
    const msg = new Discord.MessageEmbed()
    .setColor(0xfce303)
    .setTitle(`:x: Mensagem Excluida | ${message.channel.name}`)
    .addField(`Mensagem`,`${message.content}`,true)
    .addField('Autor da Mensagem', '<@'+message.author+'>',true)
    .setTimestamp()
    logChannel.send(msg)
})

Client.login(process.env.token)