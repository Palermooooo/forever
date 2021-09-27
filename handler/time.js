
const ms = require('ms');
const moment = require("moment");
const User = require('../user.js');
module.exports.run = async (client, message, args) => {
	
	if (message.channel.id != '875757114499424336') return message.reply("напоминания можно создавать только в <#875757114499424336>!");
	let user = await User.findOne({userID:message.author.id}) || new User ({userID:message.author.id});
	if (user.muted == true) return message.reply("у Вас уже есть активное напоминание!");
	let time = args[0];
	if (!time) return message.reply("укажите время!");
	let text = args.slice(1).join(" ") || "пусто";
	if (ms(time) < 6e4) return message.reply('укажите время больше 1 минуты!');
	let toms =  ms(time);
let result = Math.floor(toms / 1000);
   if (!result) return message.reply('укажите корректное время!\n> Пример: **1m | 30m | 3h**');
	if (ms(time) > 31536000001) return message.reply('укажите время меньше года!');

user.guild = message.guild.id;
	user.time = time;
	user.info = moment(Date.now()).format('DD.MM.YYYY/HH:mm:ss');
	user.save();
	let timestamp = new Date().getTime();
  let mutedUntil = new Date();

  mutedUntil.setTime(timestamp + ms(time));

  user.unmute = mutedUntil;
  user.text = text;
  user.muted = true;
  user.save().catch(() => {});
message.reply("Мы пришлем Вам уведомление в личном сообщении!");
}



module.exports.help = {
	name: 'нап',
};