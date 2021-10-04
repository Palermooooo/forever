const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const moment = require("moment");

const User = require('../user.js');
const Guild = require('../pref.js');


module.exports.run = async (client, message, args) => {
	if(message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
	
	if (message.guild.id == '797863873633976320') return;
	let nemb = new MessageEmbed()
	.setAuthor('Ошибка ❌')
	.setDescription(`**${message.author}, у Вас нехватка прав.\nТребуемые права: \`Управлять сообщениями\`**`)
	.setColor("#d30d27")
	if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(nemb);
	if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**У меня нет необходимых прав.\n> Выдайте право  ,,Управлять сообщениями"** ')
	if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('**У меня нет необходимых прав.\n> Выдайте право  ,,Управлять ролями"** ')
	
	const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
	if (!member) return message.reply('Укажи пользователя для мута!')
	testss = new MessageEmbed()
	.setDescription('Не нужно мутить бота!')
	.setColor(guild.emb);
	if(member.user.bot === true) return message.channel.send({embed:testss});

	if (member == message.member.id) return message.reply('эй! Не надо мутить себя');
	if(member.permissions.has("MANAGE_MESSAGES")) return  message.reply('**не нужно мутить модератора!**').catch(() => {});
	
	
	const role = message.guild.roles.cache.find(r => r.id == "Muted");

	if(role && member.roles.cache.has(role.id)) return message.channel.send("**❌Ошибка**\nЭтот пользователь уже в муте").catch(() => {});
	
const time = args[1];

if (!args[1]) return message.reply('**ты забыл указать время.\n> Образец мута: .mute @пользователь 1h <причина>**')

	

if (!args[2]) args[2] = 'не указана';
const reason = args.slice(2).join(" ");
if (reason.length > 150) return message.reply('**ошибка\nУстанови длину текста меньше 150 символов**');
	if (ms(time) < 6e4) return message.reply('укажите время больше 1 минуты!');
	let toms =  ms(time);
let result = Math.floor(toms / 1000);
   if (!result) return message.reply('укажите корректное время!\n> Пример: **1m | 30m | 3h**');
	
	if (ms(time) > 31536000001) return message.reply('укажите время меньше года!');
	let user = await User.findOne({ userID: member.id,guild:message.guild.id }) || new User({ userID: member.id, displayName: member.displayName,guild:message.guild.id });
	user.channel11 = message.channel.id;
	user.guildid11 = message.guild.name;
	user.reason11 = reason;
	user.time11 = time;
	user.muteinfo11 = moment(Date.now()).format('DD.MM.YYYY/HH:mm:ss');
	user.save();
	let timestamp = new Date().getTime();
  let mutedUntil = new Date();

  mutedUntil.setTime(timestamp + ms(time));

  user.unmute11 = mutedUntil;
  user.muted11 = true;
  user.save().catch(() => {});
	member.roles.add(role.id).catch(() =>{});

	const emsb = new MessageEmbed()
	
	.setDescription(`**<@${member.id}>** пользователь получил мьют на **${ms(ms(time))}**\n Причина - \`${reason}\` | выдал мут **<@${message.member.id}>**`)
.setColor("RED")
	message.channel.send({ embed: emsb }).catch(() => {});
	var embeds = new MessageEmbed()
    .setTitle('Вы были замьючены!')
 
    .setColor("RED")
    .setDescription(`**Причина:** \`${reason}\`\n **Мут выдал:** \`${message.author.tag}\`\n**Длительность мута:** \`${ms(ms(time))}\`\n**Сервер:** ${message.guild.name}`)
         .setTimestamp()
  member.send({embed:embeds}).catch(() =>{})
}



module.exports.help = {
	name: 'mute',
	desc:'мутит пользователя',

};
