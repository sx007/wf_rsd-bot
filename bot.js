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
        let embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTitle('Подключился к каналу')
        .setDescription('Пользователь: '+ newMember.user +'\nподключился к каналу:  '+ newUserChannel.name)
        .setTimestamp()
        client.channels.get('353436958724456448').send(embed);
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


client.on('guildMemberUpdate', (oldMember, newMember) => {
    var logChannel = oldMember.guild.channels.find(c => c.name === 'system');
    if(!logChannel) return;
 
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
        var userTag = logs.entries.first().executor.tag;
         //Отслеживаем изменение в никнейме пользователя
        if(oldMember.nickname !== newMember.nickname) {
            if(oldMember.nickname === null) {
                var oldNM = '\`\`По умолчанию\`\`';
            }else {
                var oldNM = oldMember.nickname;
            }
            if(newMember.nickname === null) {
                var newNM = '\`\`По умолчанию\`\`';
            }else {
                var newNM = newMember.nickname;
            }
            //Вывод сообщения о смене ника
            let updateNickname = new Discord.RichEmbed()
            .setTitle('**[СМЕНИЛ НИКНЕЙМ]**')
            //.setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**Пользователь сменивший ник:**\n ${oldMember}\n\n**Старый ник:**\n ${oldNM}\n**Новый ник:**\n ${newNM}\n\n**Сменил:**\n <@${userID}>`)
            .setTimestamp()
            //.setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
            logChannel.send(updateNickname);
        }
        //Информируем о добавлении роли пользователю
        if(oldMember.roles.size < newMember.roles.size) {
            let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
 
            let roleAdded = new Discord.RichEmbed()
            .setTitle('**[ДОБАВЛЕНА РОЛЬ]**')
            //.setThumbnail(oldMember.guild.iconURL)
            .setColor('GREEN')
            .setDescription(`**Кому добавили:**\n <@${oldMember.id}>\n\n**Роль:**\n __${role.name}__\n\n**Кто добавил:**\n <@${userID}>`)
            .setTimestamp()
            //.setFooter(userTag, userAvatar)
 
            logChannel.send(roleAdded);
        }
        //Информируем об удалении роли с пользователя
        if(oldMember.roles.size > newMember.roles.size) {
            let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
 
            let roleRemoved = new Discord.RichEmbed()
            .setTitle('**[УДАЛЕНА РОЛЬ]**')
            //.setThumbnail(oldMember.guild.iconURL)
            .setColor('RED')
            .setDescription(`**У кого удалили:**\n <@${oldMember.user.id}>\n\n**Роль:**\n __${role.name}__\n\n**Кто удалил:**\n <@${userID}>`)
            .setTimestamp()
            //.setFooter(userTag, userAvatar)
 
            logChannel.send(roleRemoved);
        }
    })
});

client.login(process.env.BOT_TOKEN);
