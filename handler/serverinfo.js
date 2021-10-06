
const Discord = module.require("discord.js");
const strftime = require('strftime')
const moment = require("moment");
const { stripIndents } = require('common-tags');
const Cooldowns = new Map();
var Cooldown = 60000;
module.exports.run = async (bot,message,args) => {
  
  if(message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
  if (!prem) t = `<a:net:810429654741680166>`, d = `<a:net:810429654741680166>` ;
  if (prem) t = `<a:da:810429638391889970>`,d = prem.date;
  if (prem && prem.date == null) d = `<a:net:810429654741680166>`;
  const regions = {
	brazil: 'Brazil 🇧🇷',
	europe: 'Europe 🇪🇺',
	hongkong: 'Hong Kong 🇭🇰',
	india: 'India 🇮🇳',
	japan: 'Japan 🇯🇵',
	russia: 'Russia 🇷🇺',
	singapore: 'Singapore 🇸🇬',
	southafrica: 'South Africa 🇿🇦',
	sydeny: 'Sydeny 🇦🇺',
};
  const verificationLevels = {
	NONE: 'Нет',
	LOW: 'Низкий',
	MEDIUM: 'Средний',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

if (!message.guild.owner.user.tag) return;
let embed = new Discord.MessageEmbed()
.setDescription(stripIndents `**Информация о сервере**\n\nДата создания🕞: **${strftime('%d.%m.%Y в %H:%M', new Date(message.guild.createdTimestamp))}**
Название сервера: **${message.guild.name}**
Создатель: **${message.guild.owner.user.tag}**
Кол-во участников👥: **${message.guild.memberCount}**
Регион: ${regions[message.guild.region]}
Уровень защиты: ${verificationLevels[message.guild.verificationLevel]}
Ролей: **${roles.length}**
Бустеров сервера **${message.guild.premiumSubscriptionCount || '0'}**
Кол-во людей в голосовом канале: ** ${message.guild.members.cache.filter(member => member.voice.channel).size}**
AFK канал:** ${message.guild.afkChannel || "Нет"}**
`)
// .addField('Кол-во текстовых каналов<:text:760576821396897792>',channels.filter(channel => channel.type === 'text').size,true)
// .addField('Кол-во голосовых каналов<:voice:760576319473320018>', channels.filter(channel => channel.type === 'voice').size,true)
.addField("**__Статусы__**",[
  `**В сети:** ${message.guild.members.cache.filter(m => m.user.presence.status === "online").size}`,
  `**Нет на месте:** ${message.guild.members.cache.filter(m => m.user.presence.status === "idle").size}`,
  `**Не беспокоить:** ${message.guild.members.cache.filter(m => m.user.presence.status === "dnd").size}`,
  `**Не в сети:** ${message.guild.members.cache.filter(m => m.user.presence.status === "offline").size}`
])

.setColor("RANDOM")
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setTimestamp()
.setFooter(message.author.username)
message.channel.send(embed);
}
    module.exports.help = {
        name: 'сервер',
        desc:'информация о сервере',
   
    };
