
const ms = require('ms');
const moment = require("moment");
const User = require('../user.js');
module.exports.run = async (client, message, args) => {
	
	if (message.channel.id != '875757114499424336') return message.reply("напоминания можно создавать только в <#875757114499424336>!");
	let user = await User.findOne({userID:message.author.id}) || new User ({userID:message.author.id});
	if (user.muted2 == true) return message.reply("у Вас уже есть активное напоминание!");
	let time = '10h';
	let res;
	if (args[0]) res = Math.floor(ms(args[0]) / 1000);
	if (!res && args[0]) return message.reply("укажите корректное время!");
	if (res) time = args[0];
user.guild = message.guild.id;
	user.time2 = time;
	user.info2 = moment(Date.now()).format('DD.MM.YYYY/HH:mm:ss');
	user.save();
	let timestamp = new Date().getTime();
  let mutedUntil = new Date();

  mutedUntil.setTime(timestamp + ms(time));

  user.unmute2 = mutedUntil;
  user.muted2 = true;
  user.save().catch(() => {});
message.reply("Мы пришлем Вам уведомление в личном сообщении!");
}



module.exports.help = {
	name: 'перки',
};