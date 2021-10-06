const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require('fs');
let User = require("./user.js");
client.commands = new Discord.Collection();
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00.31qi8.mongodb.net:27017,cluster0-shard-00-01.31qi8.mongodb.net:27017,cluster0-shard-00-02.31qi8.mongodb.net:27017/test?replicaSet=atlas-5mfvjp-shard-0&ssl=true&authSource=admin'
, {
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
	console.log("[]")

});
client.setInterval(async () => {
    const users = await User.find({ muted11: true, guild: { $ne: null } });
    users.forEach(async g => {
        let guild = client.guilds.cache.get(g.guild)
        if (!guild) return;
        let role = guild.roles.cache.find(r => r.name == "Muted");
        if (!role) return;
        let now = new Date()
        now.getTime()
        let time = g.unmute11.getTime()
        if (time <= now) {
            let user = await User.findOne({ userID: g.userID, guild: g.guild})
            user.muted11 = false;
            await user.save()
            let member = guild.members.cache.get(g.userID);
            if (!member) return;
            member.roles.remove(role.id).catch(() => { });
			let ch = client.channel.cache.get("840059609649905704")
            let embs = new MessageEmbed()
            .setDescription(`**${member.user.tag}** был размучен!`)
            .setColor("RANDOM")
        ch.send(embs).catch(() => { });
        }
    })
}, 60000);
///
client.setInterval(async () => {
    const users = await User.find({ muted2: true, guild: { $ne: null } });
    users.forEach(async g => {
        let guild = client.guilds.cache.get(g.guild)
        if (!guild) return;
        let now = new Date()
        now.getTime()
        let time = g.unmute2.getTime()
        if (time <= now) {
            let user = await User.findOne({ userID: g.userID, guild: g.guild})
            user.muted2 = false;
            await user.save()
            let member = guild.members.cache.get(g.userID);
           member.send(`Прошло 10 часов! Пора забрать перки в бесплатных паках`)
           
        }
    })
}, 80000);
client.setInterval(async () => {
    const users = await User.find({ muted2: true, guild: { $ne: null } });
    users.forEach(async g => {
        let guild = client.guilds.cache.get(g.guild)
        if (!guild) return;
        let now = new Date()
        now.getTime()
        let time = g.unmute1.getTime()
        if (time <= now) {
            let user = await User.findOne({ userID: g.userID, guild: g.guild})
            user.muted1 = false;
            await user.save()
            let member = guild.members.cache.get(g.userID);
           member.send(`Прошло 20 часов! Пора забрать бесплатный пак в национальных героях!`)
           
        }
    })
}, 70000);
client.on('messageUpdate', async (oldMessage, newMessage) => {
	if (!oldMessage.guild) return;
	let ch = client.channels.cache.get("797885110972055662");
	if (oldMessage.content.length <= 1 || newMessage.content.length <= 1 || !newMessage.member) return;
	if (oldMessage.content.length > 1020 || newMessage.content.length > 1020 || !newMessage.member) return;
	const embed = new Discord.MessageEmbed()
		.setAuthor('Сообщение было отредактированно')
		.setColor("RANDOM")
		.setDescription(`**Старое сообщение**\n${oldMessage.content}\n\n**Новое сообщение**\n${newMessage.content}`)
		.addField('Канал', newMessage.channel.name)
		.setTimestamp()
		.setFooter(newMessage.member.displayName, newMessage.author.displayAvatarURL({ dynamic: true }));
		ch.send(embed).catch(() => { });
});
client.on('messageDelete', async (message) => {
	if (!message.guild) return;
	if (!message.content && !message.attachments.first()) return;
	if (message.author == client.user) return;
	let ch = client.channels.cache.get("797885110972055662");
	const embed = new Discord.MessageEmbed()
		.setAuthor('Сообщение удалено')
		.setColor("RANDOM")
		.setDescription(`**Сообщение**\n${message.content || 'пусто'}`)
		.setImage(`${message.attachments.first().proxyURL}`)
		.addField('Канал', message.channel)
		.setTimestamp()
		.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
		if(message.attachments.first()) {
		embed.setImage(`${message.attachments.first().proxyURL}`)
		}
	return ch.send(embed);
});
client.on("message",async (msg) => {
if (!msg) return;
let user = await User.findOne({userID:msg.author.id}) || new User({userID:msg.author.id});
	user.msg++;
	user.save();
});
client.on("message",async (msg) => {
if (!msg) return;
if (msg.content == "текст") msg.channel.send("что-то"),msg.delete();
if (msg.content == "текст1") msg.channel.send("что-то2"),msg.delete();
});
client.on('message', async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;
	if (!message.member) return;
	let prefix = '!';

		message.content = message.content.substr(prefix.length);
		const newStr = message.content.replace(/\s+/g, ' ');
		const messageArray = newStr.split(' ');
		const cmd = messageArray[0].toLowerCase();
		const args = messageArray.slice(1);
		const commandfile = client.commands.get(cmd);
		if (!commandfile) return;
	
	
		
			commandfile.run(client, message, args);
	

	
});
client.login("токен");
