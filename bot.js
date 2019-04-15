const Discord = require ('discord.js');
const client = new Discord.Client();
/* Задаётся шаблон для команд */
function commandIS(str, msg){
    return msg.content.toLowerCase().startsWith("!" + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}
/* Роли */
function hasRole(mem, role){
    if (pluck(mem.roles).includes(role)){
        return true;
    }
    else {
        return false;
    }
}
/* Показывает что бот в сети */
client.on('ready', () => {
  client.user.setPresence({ game: { name: 'Warface', type: 0 } })
   console.log("Бот успешно запущен!")
});
/* команды сообщений */
client.on('message', message => {
    var args = message.content.split(/[ ]+/);
    /* команда привет */
    if(commandIS("привет", message)){
        message.reply(' привет!');
    }
    if(commandIS("команды", message)){
        message.channel.send("Доступно `для смертных`: !привет\n`Для модеров:` !скажи, !удалить, !кик");
    }
    
    /* команда скажи */
    if(commandIS("скажи", message)){
        /* вот тут разделяются права */
        if(hasRole(message.member, "Администратор") || hasRole(message.member, "Модераторы")){
            if(args.length === 1){
            message.channel.send('Ты не указал аргумент. Используй: `!скажи [что сказать]`');
        } else {
        message.channel.send(args.join(" ").substring(7));
        }
     } else {
        message.channel.send('Ты не `Администратор` или `Модератор`');
    }
    }
    /* Удаление сообщения */
    if(commandIS("удалить", message)) {
        if(hasRole(message.member, "Администратор") || hasRole(message.member, "Модераторы")){
            if(args.length >= 3){
            message.channel.send('Ты указал много аргументов. Используй: `!удалить (количество сообщений)`');
        } else {
            var msg;
            if(args.length === 1) {
                msg=2;
            } else {
                msg=parseInt(args[1]) + 1;
            }
            message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        }
     } else {
        message.channel.send('Ты не `Администратор` или `Модератор`');
    }
    }
    if(commandIS("кик", message)) {
        if(hasRole(message.member, "Администратор") || hasRole(message.member, "Модераторы")){
            if(args.length === 1){
            message.channel.send('Ты не указал аргумент. ИспользуЙ: `!кик [кого выгнать с сервера]`');
        } else {
        message.guild.member(message.mentions.users.first()).kick();
        }
    }
    }
});
//Докладываем в специальный текстовый канал об изменениях голосовых каналов
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    //Когда подключен к голосовому каналу
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        client.channels.get('353436958724456448').send('Пользователь: '+ newMember.user +'\nподключился к каналу:  '+ newUserChannel.name);
    } 
    //Когда сменил голосовой канал один на другой
    else if (newUserChannel != oldUserChannel && newUserChannel !== undefined && oldUserChannel !== undefined){
        client.channels.get('353436958724456448').send('Пользователь: '+ newMember.user + '\nперешёл из голосового канала:  '+ oldUserChannel.name + '\nв канал:  ' + newUserChannel.name);
    }
    //Когда отключился от голосового канала
    else if(oldUserChannel !== undefined && newUserChannel === undefined){
        client.channels.get('353436958724456448').send('Пользователь: '+ oldMember.user + '\nпокинул канал:  '+ oldUserChannel.name);
    } 
});

client.on('guildMemberupdate', (oldMember, newMember) => {
    const messagechannel = oldMember.guild.channels.find(r => r.name === 'Name of the channel where the announcement should be sent');
    if (!messagechannel) return 'Channel does not exist!';

    if (oldMember.roles.size < newMember.roles.size) {
        const embed = new Discord.RichEmbed()
            .setColor('ORANGE')
            .setTimestamp()
            .setAuthor('Role assigned')
            .addField(`📎 Member:`, `${oldMember.user.tag} (${oldMember.id})`);

        for (const role of newMember.roles.map(x => x.id)) {
            if (!oldMember.roles.has(role)) {
                embed.addField(`📥 Role(s):`, `${oldMember.guild.roles.get(role).name}`);
            }
        }
        messagechannel.send({
            embed
        });
    }

    if (oldMember.roles.size > newMember.roles.size) {
        const embed = new Discord.RichEmbed()
            .setColor('ORANGE')
            .setTimestamp()
            .setAuthor('Role removed')
            .addField(`📎 Member`, `${oldMember.user.tag} (${oldMember.id})`);

        for (const role of oldMember.roles.map(x => x.id)) {
            if (!newMember.roles.has(role)) {
                embed.addField(`📥 Role(s):`, `${oldMember.guild.roles.get(role).name}`);
            }
        }
        messagechannel.send({
            embed
        });
    }
});

client.on('guildMemberupdate', (oldMember, newMember) => {
    const messagechannel = oldMember.guild.channels.find(r => r.name === 'system');
    if (!messagechannel) return 'Channel does not exist!';

    if (oldMember.roles.size < newMember.roles.size) {
        const embed = new Discord.RichEmbed()
            .setColor('ORANGE')
            .setTimestamp()
            .setAuthor('Role assigned')
            .addField(`📎 Member:`, `${oldMember.user.tag} (${oldMember.id})`);

        for (const role of newMember.roles.map(x => x.id)) {
            if (!oldMember.roles.has(role)) {
                embed.addField(`📥 Role(s):`, `${oldMember.guild.roles.get(role).name}`);
            }
        }
        messagechannel.send({
            embed
        });
    }

    if (oldMember.roles.size > newMember.roles.size) {
        const embed = new Discord.RichEmbed()
            .setColor('ORANGE')
            .setTimestamp()
            .setAuthor('Role removed')
            .addField(`📎 Member`, `${oldMember.user.tag} (${oldMember.id})`);

        for (const role of oldMember.roles.map(x => x.id)) {
            if (!newMember.roles.has(role)) {
                embed.addField(`📥 Role(s):`, `${oldMember.guild.roles.get(role).name}`);
            }
        }
        messagechannel.send({
            embed
        });
    }
});

client.login(process.env.BOT_TOKEN);
