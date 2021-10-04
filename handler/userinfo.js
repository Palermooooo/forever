const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const strftime = require('strftime')
module.exports.run = async (client, message, args) => {
  if(message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
  let user = message.mentions.members.first() || message.guild.member(args[0]) || message.member;
  
	if (user) argsUser = user.user;
  else argsUser = message.author;


  let stat = {
    online: "https://emoji.gg/assets/emoji/9166_online.png",
    idle: "https://emoji.gg/assets/emoji/3929_idle.png",
    dnd : "https://emoji.gg/assets/emoji/2531_dnd.png",
    offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
  }

  let day = 1000 * 60 * 60 * 24;
  let date1 = new Date(message.createdTimestamp);
  let date2 = new Date(user.user.createdAt);
  let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day));
  let dayy = 1000 * 60 * 60 * 24
  let date11 = new Date(message.createdTimestamp)
  let date22 = new Date(user.joinedAt)
  let diff11 = Math.round(Math.abs((date11.getTime() - date22.getTime()) / dayy))
  let badges = await user.user.flags
  badges = await badges.toArray();

  let newbadges = [];
  badges.forEach(m => {
    newbadges.push(m.replace("_", " "))
  })
  const devices = {
    desktop: 'Компьютер',
    web: 'Браузер',
    mobile: 'Телефон'
    };
    let pr = "";
    for (let device in user.presence.clientStatus) {
    pr += `${devices[device]}`
    };
    if (pr.length > 9) pr = 'На нескольких устройствах';
  let b = user.user.presence.status;
  if (b == 'idle') b = 'Неактивен';
  if (b == 'dnd') b = 'Не беспокоить';
  if (b == 'online') b = 'Онлайн';
  if (b == 'offline') b = 'Не в сети';
    let embed = new MessageEmbed()
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    let array = []
    if (user.user.presence.activities.length) {
  
      let data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name 
        let xname = data[i].details 
        let zname = data[i].state 
        let type = data[i].type

        array.push(`**Играет в:** \`${name}\` `)

        if (data[i].name === "Spotify") {
          embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
        }
  
        embed.setDescription(array.join("\n"))
  
      }
    }
 
    
    embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
    embed.setTitle('Информация о пользователе')
    embed.setDescription(stripIndents `[Аватар](${user.user.displayAvatarURL({ dynamic: true })})
    **Имя:** ${argsUser.tag}
    **Дата присоединения к серверу:** ${strftime('%d.%m.%Y в %H:%M', new Date(user.joinedAt))} (${diff11} дней назад)
    **Дата создания аккаунта:** ${strftime('%d.%m.%Y в %H:%M', new Date(user.user.createdAt))} (${diff1} дней назад)
    **Девайс:** ${pr}`)
    .setColor("RED")
      .setFooter(b,stat[user.user.presence.status ])
      return message.channel.send(embed);
     };
 
    module.exports.help = {

        name: 'юзер',
  
    };
   
