
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require('fs');
let User = require("./user.js");
client.commands = new Discord.Collection();
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00.31qi8.mongodb.net:27017,cluster0-shard-00-01.31qi8.mongodb.net:27017,cluster0-shard-00-02.31qi8.mongodb.net:27017/test?replicaSet=atlas-5mfvjp-shard-0&ssl=true&authSource=admin', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	autoIndex: false,
})
	.catch((e) => console.log('[index.js] ' + e));
	

fs.readdir('./handler/', (err, files) => {
	let ch = 0;
	if (err) { console.log(err);}
	const jsfile = files.filter(f => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		console.log('❌[app.js] Команды не найдены❌ ');
		return;
	}
	jsfile.forEach((f) => {
		const props = require(`./handler/${f}`);
		ch++;
		client.commands.set(props.help.name, props);
	});
	console.log(`Загружено команд: ${ch}`)
});

client.on("ready", async () => {

});
client.setInterval(async () => {
	const users = await User.find({ muted: true});
	users.forEach(async g => {
		let guild = client.guilds.cache.get("797863873633976320");
		let now = new Date()
		now.getTime()
		let time = g.unmute.getTime()
		if (time <= now) {
			let user = await User.findOne({ userID: g.userID});
			user.muted = false;
			await user.save()
			let member = guild.members.cache.get(g.userID);
			let emb = new MessageEmbed()
			.setAuthor("Напоминание")
			.setDescription(`Текст: ` + user.text)
			.setColor("#57f287")
			.setTimestamp()
			if (member) member.send(emb);
		}
	})
}, 10000);
client.setInterval(async () => {
	const users = await User.find({ muted1: true});
	users.forEach(async g => {
		let guild = client.guilds.cache.get("797863873633976320");
		let now = new Date()
		now.getTime()
		let time = g.unmute1.getTime()
		if (time <= now) {
			let user = await User.findOne({ userID: g.userID});
			user.muted1 = false;
			await user.save()
			let member = guild.members.cache.get(g.userID);
			if (member) member.send('Прошло 20 часов! Пора забрать бесплатный пак в национальных героях!');
		}
	})
}, 15000);
client.setInterval(async () => {
	const users = await User.find({ muted2: true});
	users.forEach(async g => {
		let guild = client.guilds.cache.get("797863873633976320");
		let now = new Date()
		now.getTime()
		let time = g.unmute2.getTime()
		if (time <= now) {
			let user = await User.findOne({ userID: g.userID});
			user.muted2 = false;
			await user.save()
			let member = guild.members.cache.get(g.userID);
			if (member) member.send('Прошло 10 часов! Пора забрать перки в бесплатных паках!');
		}
	})
}, 20000);
client.on('message', async (message) => {
if (!message) return;
let user = await User.findOne({userID:message.author.id}) || new User({userID:message.author.id});
msg++;
user.save();
});
client.on('message', async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;
	if (!message.member) return;
	let prefix = '.';

		message.content = message.content.substr(prefix.length);
		const newStr = message.content.replace(/\s+/g, ' ');
		const messageArray = newStr.split(' ');
		const cmd = messageArray[0].toLowerCase();
		const args = messageArray.slice(1);
		const commandfile = client.commands.get(cmd);
		if (!commandfile) return;
	
	
		
			commandfile.run(client, message, args);
	

	
});
client.setInterval(async () => {

		let guild = client.guilds.cache.get('797863873633976320');
		if (!guild) return;
		let channel = guild.channels.cache.get('880496320547278858');
		if (!channel) return;
	   const name = `Онлайн: ${channel.guild.memberCount - channel.guild.members.cache.filter(m => m.user.presence.status == 'offline').size}`;
		if (channel.name != name) channel.setName(name).catch(() => { });
	
}, 600000);
client.setInterval(async () => {

	let guild = client.guilds.cache.get('797863873633976320');
	if (!guild) return;
	let channel = guild.channels.cache.get('880496429301370971');
	if (!channel) return;
   const name = `Участники: ${channel.guild.memberCount}`;
	if (channel.name != name) channel.setName(name).catch(() => { });

}, 610000);
client.setInterval(async () => {

	let guild = client.guilds.cache.get('797863873633976320');
	if (!guild) return;
	let channel = guild.channels.cache.get('880496300657901608');
	if (!channel) return;
   const name = `Бустеров: ${guild.premiumSubscriptionCount || '0'}`;
	if (channel.name != name) channel.setName(name).catch(() => { });

}, 620000);
client.login('токен');
