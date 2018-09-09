const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

client.on("ready", () => {
  client.user.setPresence({ game: { name: config.game, type: 0 } })
   console.log("Бот успешно запущен!");
});
//Обрабатываем события в сообщениях
client.on("message", (message) => {
  const toJoin = client.channels.get(config.radioMuz);
  const botRoom = message.guild.channels.find("id", config.radioText);
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();  
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    if(command === 'ping') {
      message.channel.send('Pong!');
    } else
    if (command === 'blya') {
      message.channel.send('pizdec');
    }

    if (command === "asl") {
      let [age, sex, location] = args;
      message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
    }

    if(command === "say"){
      let text = args.slice(0).join(" ");
      message.delete();
      message.channel.send(text);
    }
    //radio
    if (command === "radio") {
      if (message.channel.id !== config.radioText) {
        return message.channel.id(`Упс, заказ и прослушивание радио в канале ${botRoom}`
        );
      }
      if (args.length < 1 || args.length > 2) {
        return message.author.send([
          "ОШИБКА: Недостаточно аргументов",
          "Используйте: `!radio <play> <(optional) truckersfm | eurotruck | capitalfm`",
        ]);
      }
      if (args[0] === "stop") {
        toJoin.leave();
        return botRoom.send("Радио остановлено");
      }
      if (!message.member.voiceChannel) {
        return message.channel.send(
          "Вы должны быть в голосовом канале, чтобы использовать эту команду"
        );
      }
      if (message.member.voiceChannel.id !== config.radioMuz) {
        return message.channel.send(
          "Вы должны быть в радиоканале, чтобы использовать эту команду"
        );
      }
      if (args[0] === "play") {
        toJoin
          .join()
          .then(connection => {
            if (connection.playing) {
              connection.stopPlaying();
            }
    
            switch (args[1]) {
              case "truckersfm":
                botRoom.send("Сейчас играет: TruckersFM");
                connection.playArbitraryInput("https://radio.truckers.fm/");
                break;
              case "eurotruck":
                botRoom.send("Сейчас играет: Euro Truck Radio");
                connection.playArbitraryInput(
                  "http://radio.eurotruckradio.co.uk:8000/stream"
                );
                break;
              case "capitalfm":
                botRoom.send("Сейчас играет: CapitalFM");
                connection.playArbitraryInput(
                  "http://media-ice.musicradio.com/CapitalMP3"
                );
                break;
              default:
                {
                  const radioArray = [
                    {
                      url: "http://radio.eurotruckradio.co.uk:8000/stream",
                      name: "Euro Truck Radio",
                    },
                    {
                      url: "https://radio.truckers.fm/",
                      name: "Truckers FM",
                    },
                    {
                      url: "http://media-ice.musicradio.com/CapitalMP3",
                      name: "Capital FM",
                    },
                  ];
                  const randomStream = Math.floor(
                    Math.random() * radioArray.length
                  );
                  connection.playArbitraryInput(radioArray[randomStream]["url"]);
                  botRoom.send(`Сейчас играет: ${radioArray[randomStream]["name"]}`);
                }
                break;
            }
          })
          .catch(err => console.log(err));
      }







    }

    //Админ команды
    //кик
    if(command === "kick") {
      if(message.author.id !== config.ownerID) return;
      let member = message.mentions.members.first();
      let reason = args.slice(1).join(" ");
      member.kick(reason);
    }
});
client.login(config.token);
