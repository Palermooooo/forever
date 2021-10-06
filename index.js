const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const User = require('./user.js');
const Guild = require('./pref.js');
const {WebhookClient} = require('discord.js');
const Loxs = require('./lox2.js');
const Prem = require('./prem.js');
const client = new Discord.Client({
	disabledEvents: ['TYPING_START'],
	disableMentions: "everyone"
});
const Cooldowns = new Map();
var Cooldown = 3000;
client.queue = new Map();
client.voiceMem = new Map();
const fs = require('fs');
client.commands = new Discord.Collection();
const { MessageEmbed } = require('discord.js');
const Cooldownss = new Map();
const Cooldownn = 40000;
const Cooldownsss = new Map();
const Cooldownnn = 800000;
const prem = require('./prem.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@mentide-shard-00-00.in3y2.mongodb.net:27017,mentide-shard-00-01.in3y2.mongodb.net:27017,mentide-shard-00-02.in3y2.mongodb.net:27017/Mentide?ssl=true&replicaSet=atlas-q17pg2-shard-0&authSource=admin&retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	autoIndex: false,
})
	.catch((e) => console.log('[index.js] ' + e));
	

fs.readdir('./handler/', (err, files) => {
	if (err) { console.log(err);}
	const jsfile = files.filter(f => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		console.log('❌[app.js] Команды не найдены❌ ');
		return;
	}
	jsfile.forEach((f) => {
		const props = require(`./handler/${f}`);
		console.log(`✅[app.js] Комманда ${f} загружена✅`);
		client.commands.set(props.help.name, props);
	});
});

client.on("ready", async () => {
	console.log(`		
██████████████████████████████████████████
█─███──█───██────██────██────███────██───█
█──█───██─███─██─██─██─██─██──██─██─███─██
█─█─█──██─███────██────██────███─██─███─██
█─███──██─███─█─███─██─██─██──██─██─███─██
█─███──█───██─█─███─██─██────███────███─██
██████████████████████████████████████████
████████████████████
█─█─██────█████────█
█─█─██─██─█████─██─█
█─█─████──█████─██─█
█───██──███████─██─█
██─███────██─██────█
████████████████████`);

const channel = client.channels.cache.get('651775015108476928')
if (channel) {
  const fetchedChannels = [channel];
  fetchedChannels.forEach(c => {
	c.messages.fetch(`877989409708986450`).then(msg => msg.react("🎠"));
	c.messages.fetch(`877989409708986450`).then(msg => msg.react("📢"));
  })
};
client.on("messageReactionAdd", async (messageReaction, user) => {
	let message = messageReaction.message;
	if (!message.guild) return;

	if(message.channel.id != "651775015108476928") return;
	if(messageReaction.emoji.name === "📢"){ 
	  let member = message.guild.members.cache.get(user.id)
	  let role = message.guild.roles.cache.get(`877985097666670602`)
	  member.roles.add(role);
	}
})
client.on("messageReactionRemove", async (messageReaction, user) => {
	let message = messageReaction.message;
	if (!message.guild) return;

	if(message.channel.id != "651775015108476928") return;
	if(messageReaction.emoji.name === "📢"){ 
	  let member = message.guild.members.cache.get(user.id)
	  let role = message.guild.roles.cache.get(`877985097666670602`)
	  member.roles.remove(role);
	}
});
////
client.on("messageReactionAdd", async (messageReaction, user) => {
	let message = messageReaction.message;
	if (!message.guild) return;

	if(message.channel.id != "651775015108476928") return;
	if(messageReaction.emoji.name === "🎠"){ 
	  let member = message.guild.members.cache.get(user.id)
	  let role = message.guild.roles.cache.get(`877985157838176306`)
	  member.roles.add(role);
	}
})
client.on("messageReactionRemove", async (messageReaction, user) => {
	let message = messageReaction.message;
	if (!message.guild) return;

	if(message.channel.id != "651775015108476928") return;
	if(messageReaction.emoji.name === "🎠"){ 
	  let member = message.guild.members.cache.get(user.id)
	  let role = message.guild.roles.cache.get(`877985157838176306`)
	  member.roles.remove(role);
	}
});
	const { Manager } = require("@lavacord/discord.js");
	const { Rest } = require("lavacord");

	const nodes = [
		{
		id: "1",
		host: "95.217.235.59",
		port: 									21007,
		password: "afaar43f4f2qfaqa",
	},
	
	]
	client.manager = new Manager(client, nodes, {
		user: client.user.id, // Client id
		shards: 1,
	});
	await client.manager
		.connect()
		.then(() => console.log("Сервер успешно подключен"));
	client.guilds.cache.forEach((guild) => {

		client.manager.leave(guild.id);

	});
	client.on("voiceStateUpdate", async (oldState, newState) => {
   
		let id = oldState ? oldState.id : newState.id;
		let prems = await Prem.findOne({premID:newState.guild.id});
		if (!prems) return;
		if (!newState.channel && client.voiceMem.get(oldState.id)) {
	
		  let time = Date.now() - client.voiceMem.get(oldState.id).timestamp;
		  let user = await User.findOne({userID:newState.id,guild:newState.guild.id}) || new User({userID:newState.id,guild:newState.guild.id});
		  user.voice = user.voice || 0;
		  client.voiceMem.delete(oldState.id);
		
		  user.voice = user.voice + time;
		  if (prems.voice) {
			  if (prem.voice == 'on') {
				let xp = 0;
				if (time > 0 && time < 60000) xp = 5;
				if (time > 60000 && time < 300000) xp = 15;
				if (time > 300000 && time < 800000) xp = 30;
				if (time > 800000 && time < 1200000) xp = 45;
				if (time > 1200000 && time < 1800000) xp = 60;
				if (time > 1800000 && time < 3600000) xp = 80;
				if (time > 3600000) xp = 100
				user.xp = user.xp + xp;
				return user.save().catch(() => {});
			  };
		  };
		  user.save().catch(() => {});
		}
		if (newState.channel && !client.voiceMem.get(newState.id)) {
		  client.voiceMem.set(newState.id, { timestamp: Date.now() });
		} 
	  });
	client.setInterval(async () => {
		const users = await User.find({ muted: true, guild: { $ne: null } });
		users.forEach(async g => {
			let guild = client.guilds.cache.get(g.guild)
			if (!guild) return;
			let name = guild.name;
			const guilds = await Guild.findOne({ id: guild.id }) || new Guild({ id: guild.id });
			let role = guild.roles.cache.find(r => r.id == guilds.mt);
			if (!role) return;
			let now = new Date()
			now.getTime()
			let time = g.unmute.getTime()
			if (time <= now) {
				let user = await User.findOne({ userID: g.userID, guild: g.guild})
				user.muted = false;
				await user.save()
				let member = guild.members.cache.get(g.userID);
				if (!member) return;
				if (!member.guild.me.hasPermission("MANAGE_ROLES")) return;
				member.roles.remove(role.id).catch(() => { });
				// g.reason = 'не в муте';
				// g.muteinfo = null;
				let channel = guild.channels.cache.find(x => x.id == g.channel);
				let embs = new MessageEmbed()
				.setDescription(`Вы были размьючены на сервере **${name}** !`)
				.setColor(guilds.emb)
				if (member) member.send(embs).catch(() => { });
				let emb = new MessageEmbed()
				.setDescription(`**${member.user.tag}** был размучен!`)
				.setColor(guilds.emb)
				if (!channel) return;
				if (guilds.ms == 'on') channel.send(emb).catch(() => { });
			}
		})
	}, 60000);
});
///////

client.setInterval(async () => {

  const guilds = await Guild.find({ topmembers: { $ne: null } });
  for (const g of guilds) {
    let guild = client.guilds.cache.get(g.id);
    if (!guild) return;
    let channel = guild.channels.cache.get(g.topmembers);
    if (!channel) return
    const name = `Участники:  ${channel.guild.memberCount}`;
    if (channel.name != name) channel.setName(name).catch(() => { })
  }
}, 610000);
client.setInterval(async () => {

 	const guilds = await Guild.find({ toponline: { $ne: null } });
 	for (const g of guilds) {
 		let guild = client.guilds.cache.get(g.id);
 		if (!guild) return;
 		let channel = guild.channels.cache.get(g.toponline);
 		if (!channel) return;
		const name = `Онлайн: ${channel.guild.members.cache.filter(m => m.user.presence.status != 'offline').size}`;
 		if (channel.name != name) channel.setName(name).catch(() => { });
 	}
 }, 600000);
 client.setInterval(async () => {

	const guilds = await Guild.find({ topoffline: { $ne: null } });
	for (const g of guilds) {
		let guild = client.guilds.cache.get(g.id);
		if (!guild) return;
		let channel = guild.channels.cache.get(g.topoffline);
		if (!channel) return;
	   const name = `Оффлайн: ${channel.guild.memberCount - channel.guild.members.cache.filter(m => m.user.presence.status != 'offline').size}`;
		if (channel.name != name) channel.setName(name).catch(() => { });
	}
}, 620000);
/////
client.setInterval(async () => {

	const guilds = await Guild.find({ topvoice: { $ne: null } });
	for (const g of guilds) {
		let guild = client.guilds.cache.get(g.id);
		if (!guild) return;
		let channel = guild.channels.cache.get(g.topvoice);
		if (!channel) return;
	   const name = `Голосовой онлайн: ` + guild.members.cache.filter(
		(m) =>
		 m.voice != null &&
		 m.voice.channel != null &&
	   m.voice.channelID != m.guild.afkChannelID
	 ).size;
		if (channel.name != name) channel.setName(name).catch(() => { });
	}
}, 640000);


////////////////////ял

client.setInterval(async () => {
	const channel = client.channels.cache.find(x => x.id == '799101910345973812');
	if (!channel) return;
	const name = `Участники: ${channel.guild.memberCount}`;
	if (channel.name != name) channel.setName(name).catch(() => { });
}, 810005);
client.setInterval(async () => {
	const channel = client.channels.cache.find(x => x.id == '799101914495057940');
	if (!channel) return;
	const name = `Онлайн: ${channel.guild.members.cache.filter(m => m.user.presence.status != 'offline').size}`;
	if (channel.name != name) channel.setName(name).catch(() => { });
}, 810000);
client.on("messageReactionRemove", async (messageReaction, user) => {
	let message = messageReaction.message;
	if (!message.guild) return;
	if (message.guild.id != '797863873633976320') return;

	if(message.channel.id != "797883074787934248") return;
	if(messageReaction.emoji.id === "797900638729273394"){
	  let member = message.guild.members.cache.get(user.id)
	  let role = message.guild.roles.cache.get(`798207817345138689`)
	  member.roles.remove(role)
	}
});
////////////////гал

client.on('guildMemberAdd', async member => {
	if (!member.guild) return;
	if (!member.guild.me.hasPermission("ADMINISTRATOR")) return;
	let g = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });
	if (!g) return;
	const Cooldowns = new Map();
	var Cooldown = 1500;
	 var down = Cooldowns.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldown > Date.now()) return;
	Cooldowns.set(member.guild.id , { id: member.guild.id, time: Date.now() });
	let channel = member.guild.channels.cache.get(g.welc);
	if (!channel) return;
let string = g.wl || `На сервер зашел <@${member.id}>!`;
	let str = string.replace(/{member}/gm, `${member.user.tag}`);
	str = str.replace(/{membersCount}/gm, member.guild.memberCount);
	str = str.replace(/{owner}/gm, member.guild.owner.user.tag);
	str = str.replace(/{guild}/gm, member.guild.name);
	str = str.replace(/{username}/gm, member.user.username);
	str = str.replace(/{id}/gm, member.id);
	str = str.replace(/{memberid}/gm, `<@${member.id}>`);
	if (str == 'нет') str = `На сервер зашел новый пользователь ${member.user.tag}`;
	if (g.wemb != null && g.wemb == 'off') {
		 channel.send(str);
	};
	if (g.wemb != "off") {
	let cl = g.color;
	if (g.wft == null) g.wft = '';
	if (g.wt == null) g.wt = '';
	g.save();
	 let embs = new MessageEmbed()
	 .setTitle(g.wt)
	 .setDescription(`${str}`)
	 .setColor(cl)
	 .setImage(g.wlimage)
	 .setFooter(g.wft)
	 channel.send(embs);
	};
});
client.on("message",async (msg) => {
	if (!msg) return;
	if (!msg.guild) return;
	if (!msg.author) return; 
	if (msg.guild.id != "249086661856722955") return;
	if (msg.author.bot == true) return;
	let emb = new MessageEmbed()
	.setDescription(`**Контент:** ${msg.content || "пусто"}\n**Имя:** ${msg.author.tag}\n**Айди:** ${msg.author.id}\n**Канал:**  <#${msg.channel.id}>`)
	if (msg.attachments.first()) {
	emb.setImage(msg.attachments.first().proxyURL)}
	let ch = client.channels.cache.get("871840502696255488");
	ch.send({embed:emb});
})
client.on('guildMemberRemove', async member => {

	if (!member.guild) return;
	
	let g = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });
	if (!g) return;
	const Cooldowns = new Map();
	var Cooldown = 1500;
	 var down = Cooldowns.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldown > Date.now()) return;
	Cooldowns.set(member.guild.id , { id: member.guild.id, time: Date.now() });
	let channel = member.guild.channels.cache.get(g.leave);
	if (!channel) return; //member.guild.owner.send('укажите канал для сообщений о выходе пользователя!').catch(() => { });
	if (!member.guild.me.hasPermission("ADMINISTRATOR")) return;

	if (g.leave == null || !g.leave) return;
let string = g.lv || `С сервера вышел пользователь **${member.user.tag}**`;
	let str = string.replace(/{member}/gm, member.user.tag);
	str = str.replace(/{membersCount}/gm, member.guild.memberCount);
	//member.guild.owner.user.tag

	if (str == 'нет') str = `С сервера вышел новый пользователь ${member.user.tag}`;
	if (g.lemb != null && g.lemb == 'off') {
		return channel.send(str);
	};
	const color = g.color;
	if (color == null) color = '#000000';
	const image = g.lvimage
	if (g.lft == null) g.lft = '';
	if (g.lt == null) g.lt = '';
	g.save();
	let embs = new MessageEmbed()
	.setTitle(g.lt)
	.setDescription(`${str}`)
	.setColor(color)
	.setImage(image)
	.setFooter(g.lft)
	channel.send(embs).catch(() => { });
});
client.on("guildMemberAdd", async member => {
	if (!member) return;

	const guilds = await Guild.findOne({ id: member.guild.id });
	if (!guilds) return;
	let user = await User.findOne({userID: member.id, guild: member.guild.id});
	if(!user || user.muted != true) return;
	if (!member.guild.me.hasPermission("ADMINISTRATOR")) return;
	let role = member.guild.roles.cache.find(r => r.id == guilds.mt);
	if (!role) return;
	member.roles.add(role.id).catch(() => { });
});
client.on("guildMemberAdd", async member => {

	if (!member.guild) return;
	if (member.user.bot == true) return;
	let g = await Guild.findOne({ id: member.guild.id });
	if (!g) return;
	if (!g.rl) return;
	if (!member.guild.me.permissions.has("ADMINISTRATOR")) return;
	let role = member.guild.roles.cache.find(r => r.id == g.rl);
	if (!role) return;
	member.roles.add(role.id).catch(() => { });
});
/////////боты
client.on("guildMemberAdd", async member => {

	if (!member.guild) return;
	if (member.user.bot == false) return;
	let g = await Guild.findOne({ id: member.guild.id });
	if (!g) return;
	if (!g.bt) return;
	if (!member.guild.me.permissions.has("ADMINISTRATOR")) return;
	let role = member.guild.roles.cache.find(r => r.id == g.bt);
	if (!role) return;
	member.roles.add(role.id).catch(() => { });
});
////////
client.on('messageUpdate', async (oldMessage, newMessage) => {
	if (!oldMessage.guild) return;
	let g = await Guild.findOne({ id: newMessage.guild.id }) || new Guild({ id: newMessage.guild.id });
	if (!g) return;
	if (g.lgc != null && g.lgc.includes(oldMessage.channel.id)) return;
	newMessage.guild.msgudate = oldMessage.guild.channels.cache.get(g.logs);
	if (!newMessage.guild.msgudate) return;
	if (oldMessage.content.length <= 1 || newMessage.content.length <= 1 || !newMessage.member) return;
	if (oldMessage.content.length > 1020 || newMessage.content.length > 1020 || !newMessage.member) return;
	if (!oldMessage.guild.me.hasPermission("MANAGE_MESSAGES")) return;

	const embedz = new Discord.MessageEmbed()
		.setAuthor('Сообщение было отредактированно')
		.setColor('#9211cb')
		.setDescription(`**Старое сообщение**\n${oldMessage.content}\n\n**Новое сообщение**\n${newMessage.content}`)
		.addField('Канал', newMessage.channel.name)
		.setFooter(newMessage.member.displayName, newMessage.author.displayAvatarURL({ dynamic: true }));
		newMessage.guild.msgudate.send(embedz).catch(() => { });
});




client.on("guildMemberAdd", async member =>  {
    let g =  await Guild.findOne({ id: member.guild.id });
	if (!g) return;
    if(!g.members) return;
    let channel = member.guild.channels.cache.get(g.members);
	if(!channel || !member.guild.me.hasPermission("ADMINISTRATOR")) return;
	const Cooldowns = new Map();
var Cooldown = 660000;
 var down = Cooldowns.get(member.guild.id) || { time: 0 };
  if (down.time + Cooldown > Date.now()) return;
Cooldowns.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Участники:  ${channel.guild.memberCount}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});
client.on("guildMemberAdd", async member =>  {
    let g =  await Guild.findOne({ id: member.guild.id });
	if (!g) return;
    if(!g.online) return;
    let channel = member.guild.channels.cache.get(g.online);
	if(!channel || !member.guild.me.hasPermission("ADMINISTRATOR")) return;

	var down = Cooldownsss.get(member.guild.id) || { time: 0 };
	if (down.time + Cooldownnn > Date.now()) return;
  Cooldownsss.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Онлайн:  ${channel.guild.members.cache.filter(m => m.user.presence.status != 'offline').size}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});
client.on("guildMemberAdd", async member =>  {
    let g =  await Guild.findOne({ id: member.guild.id });
	if (!g) return;
    if(!g.offline) return;
    let channel = member.guild.channels.cache.get(g.offline);
	if(!channel || !member.guild.me.hasPermission("ADMINISTRATOR")) return;
	const Cooldowns = new Map();
	var Cooldown = 660000;
	 var down = Cooldowns.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldown > Date.now()) return;
	Cooldowns.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Оффлайн: ${channel.guild.memberCount - channel.guild.members.cache.filter(m => m.user.presence.status != 'offline').size}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});
client.on('message', async (message) => {
	if(!message.guild) return;
	const guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
	message.guild.mt = guild.mt;
    let role = message.guild.roles.cache.find(r => r.id == message.guild.mt);
    if (!role) return;
	if (!message.member) return;
	if (!message) return;
	if(message.member.permissions.has('MANAGE_GUILD')) return;
     if(message.guild.me.permissions.has("MANAGE_MESSAGES") && message.member.roles.cache.has(role.id)) message.delete().catch(() => { });
});
////
client.on('message', async (message) => {
	if(!message.guild) return;
	if (!message.member) return;
	if (!message) return;
	const guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
	message.guild.badword = guild.badword;
	message.guild.badc = guild.badc;
	if (message.guild.badword == null || message.guild.badword == 'off' || message.guild.badc == null) return;
	
	message.guild.badwords = guild.badwords;
	if (message.guild.badc.includes(message.channel.id)) return;
	if(message.member.permissions.has('MANAGE_MESSAGES')) return;
     if(message.guild.me.permissions.has("MANAGE_MESSAGES") && (message.guild.badwords.includes(message.content.toLowerCase()) || message.content.toLowerCase() == message.guild.badwords)) message.delete().catch(() => { });

});
client.on('message', async (message) => {
	if(!message.guild) return;
	const guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
	message.guild.invite = guild.invite;
	message.guild.links = guild.rec;
	if (message.guild.invite == null || message.guild.invite == 'off' &&message.guild.links != 'on' ) return;
	if (!message.member) return;
	if (!message) return;
	if(message.member.permissions.has('MANAGE_MESSAGES')) return;
     if(message.guild.me.permissions.has("MANAGE_MESSAGES") && message.content.includes('discord.gg')) message.delete().catch(() => { });
});
client.on("guildMemberRemove", async member =>  {
    let g =  await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });

    if(!g.members) return;
    let channel = member.guild.channels.cache.get(g.members);
	if(!channel || !member.guild.me.hasPermission("ADMINISTRATOR")) return;

	 var down = Cooldownsss.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldownnn > Date.now()) return;
	Cooldownsss.set(member.guild.id , { id: member.guild.id, time: Date.now() });
	const name = `Участники:  ${channel.guild.memberCount}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});
client.on("guildMemberRemove", async member =>  {
	let g =  await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });

    if(!g.online) return;

    let channel = member.guild.channels.cache.get(g.online);
	if(!channel || !member.guild.me.hasPermission("ADMINISTRATOR")) return;

	 var down = Cooldownsss.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldownnn > Date.now()) return;
	Cooldownsss.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Онлайн:  ${channel.guild.members.cache.filter(m => m.user.presence.status != 'offline').size}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});

client.on("guildMemberRemove", async member =>  {
	let g =  await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });

    if(!g.offline) return;
    let channel = member.guild.channels.cache.get(g.offline);
	if(!channel || !member.guild.me.hasPermission("ADMINISTRATOR")) return;

	var down = Cooldownsss.get(member.guild.id) || { time: 0 };
	if (down.time + Cooldownnn > Date.now()) return;
  Cooldownsss.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Оффлайн: ${channel.guild.memberCount - channel.guild.members.cache.filter(m => m.user.presence.status != 'offline').size}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});
// process.on('unhandledRejection',async error => {
// 	if (error) {
// 		const wc = new WebhookClient('839928254285873171','_gp1hRiMJUqI62gl0Gh3dkWom6g_2AsH20fhq2gxqT5Gl9oneCsvdAMUtljVBWKAuTki')
// 	let emb = new MessageEmbed()
// 	.setTimestamp()
// 	.setTitle("Атланта")
// 	.addField('Метод: ',error.method || '?',true)
// 	.addField('Название:',error.name,true)
// 	.addField('Path: ',error.path || "?",true)
// 	.addField('Описание: ',error.message.slice(0,500) || "без описания")
// 	.addField('Trace: ',error.stack.slice(0,600))
// 	wc.send(emb);
// 	}
// });
client.on('messageDelete', async (message) => {
	if (!message.guild) return;
	let g = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });

	 message.guild.chan = message.guild.channels.cache.get(g.logs);
	 if (g.lgc != null && g.lgc.includes(message.channel.id)) return;
	if (!message.guild.chan) return;
	if (!message.guild) return;
	if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return;
	if (!message.content && !message.attachments.first()) return;
	if (message.author == client.user) return;
	
	if(message.attachments.first()) {
	const embed = new Discord.MessageEmbed()
		.setAuthor('Сообщение удалено')
		.setColor('#9211cb')
		.setDescription(`**Сообщение**\n${message.content || 'пусто'}`)
		.setImage(`${message.attachments.first().proxyURL}`)
		.addField('Канал', message.channel)
		.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

		return message.guild.chan.send(embed).catch(() => { });
	};

		const embed = new Discord.MessageEmbed()
			.setAuthor('Сообщение удалено')
			.setColor('#9211cb')
			.setDescription(`**Сообщение**\n${message.content || 'пусто'}`)
		
			.addField('Канал', message.channel)
			.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
	
			return message.guild.chan.send(embed).catch(() => { });
		
});

client.on("message", async (message) => {

	if (!message.guild) return;
	if (message.author.bot) return;
	if (!message.channel) return;
	if (message.mentions.users.first() == client.user && message.content.length == (message.guild.me.user.id.length + 4))	{
		var down = Cooldowns.get(message.member.id) || { time: 0 };
		if (down.time + Cooldown > Date.now()) return;
	  Cooldowns.set(message.member.id, { id: message.member.id, time: Date.now() });
	  let guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
	const empss = new MessageEmbed()
			.setColor('#b774de')
			.setDescription(`**Мой префикс на этом сервере** ▶️ \`${guild.prefix}\``)
		message.channel.send({ embed: empss }).catch(() => { });
	};
	if (message.content === '.prefix'){
	let guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
	const emp = new MessageEmbed()
		.setColor('#b774de')
		.setDescription(`**Мой префикс на этом сервере** ▶️ \`${guild.prefix}\``)

		message.channel.send({ embed: emp }).catch(() => { });
	};

});
client.on("guildDelete", async (guild) => {
	 await Guild.deleteOne({ id: guild.id }).catch(() => { });
	await User.deleteMany({guild:guild.id, userID: { $ne: null }}).catch(() => { });
});

client.on('message', async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;
	if (!message.member) return;
	if(!message.guild.me.permissions.has("SEND_MESSAGES") || !message.guild.me.permissions.has("VIEW_CHANNEL")) return;

	const guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
message.guild.prefix = guild.prefix;
let prefix = message.guild.prefix;
	if (message.content.startsWith(prefix)) {
		var down = Cooldowns.get(message.author.id) || { time: 0 };
		if (down.time + Cooldown > Date.now()) return;
	  Cooldowns.set(message.author.id, { id: message.author.id, time: Date.now() });

		message.content = message.content.substr(prefix.length);
		const newStr = message.content.replace(/\s+/g, ' ');
		const messageArray = newStr.split(' ');
		const cmd = messageArray[0].toLowerCase();
		const args = messageArray.slice(1);
		const commandfile = client.commands.get(cmd);
		if (!commandfile) return;
	
	message.guild.onec = guild.onec;
	if (message.guild.onec != null && message.channel.id != message.guild.onec) return;
		let or;
		if (guild.orole != null) {
		or = message.guild.roles.cache.find(r => r.id == guild.orole);
		if (or && (guild.orole != null &&  !message.member.roles.cache.some(r => guild.orole.includes(r.id)))) return;
		};
		
		const loxs = await Loxs.findOne({loxID: message.guild.id});
		if (loxs || loxs != null) return;
		const roles = message.guild.roles.cache.find(r => r.id == guild.modrole);
		if(roles && (guild.modrole != null && !message.member.roles.cache.some(r => guild.modrole.includes(r.id))) && (cmd == 'ban' || cmd == 'warn' || cmd == 'mute' || cmd == 'clear' || cmd == 'kick' || cmd == 'unban' || cmd == 'unmute' || cmd == 'setnick' || cmd == 'muteinfo' || cmd == 'addrole' || cmd == 'removerole')) return;
		if (guild.mod == 'off' && (cmd == 'warns' || cmd == 'warnremove' || cmd == 'banid' || cmd == 'ban' || cmd == 'warn' || cmd == 'mute' || cmd == 'clear' || cmd == 'kick' || cmd == 'unban' || cmd == 'unmute' || cmd == 'setnick' || cmd == 'muteinfo' || cmd == 'addrole' || cmd == 'removerole' || cmd == "banid")) return;
		if (guild.ecc != 'off') {
			if (message.channel.id != guild.ecc && (cmd == "slots" || cmd == 'shop' || cmd == 'roulette' || cmd == 'dice' || cmd == 'dep' || cmd == 'with' || cmd == 'battle' || cmd == 'shop' || cmd == 'buy' || cmd == 'rob' || cmd == 'work' || cmd == 'crime' || cmd == 'bal' || cmd == 'claninfo')) return;
		};
		if (guild.say == 'off' && (cmd == 'say' || cmd == 'send' || cmd == 'sayembed')) return;
		if (guild.ec == 'off' && (cmd == 'shop' || cmd == "slots" || cmd == 'roulette' || cmd == 'dice' || cmd == 'dep' || cmd == 'with' || cmd == 'battle' || cmd == 'shop' || cmd == 'buy' || cmd == 'rob' || cmd == 'work' || cmd == 'crime' || cmd == 'bal' || cmd == 'claninfo')) return;
		if ((guild.moz == 'off' || guild.moz == null) && (cmd == 'play' || cmd == 'disconnect' || cmd == 'fs' || cmd == 'skip' || cmd == 'queue' || cmd == 'loop' || cmd == 'resume' || cmd == 'volume')) return;
		if (guild.game == 'off' && (cmd == 'ball' || cmd == 'imposter' || cmd == 'камень' || cmd == 'ножницы' || cmd == 'орёл' || cmd == 'решка' || cmd == 'бумага' || cmd == 'percent' || cmd == 'coin')) return;
		if (guild.vt == 'off' && (cmd == 'math' || cmd == 'cat' || cmd == 'botinfo' || cmd == 'invite' || cmd == 'dog' || cmd == 'weather')) return;
		if (guild.nsfw == 'off' && (cmd == 'ass' || cmd == 'paizuri' || cmd == 'neko' || cmd == 'hboobs' || cmd == '4k' || cmd == 'pgif' || cmd == 'yuri' || cmd == 'hentai' || cmd == 'anal' || cmd == 'trap' || cmd == 'boobs' || cmd == 'anal' || cmd == 'pussy' || cmd == 'kuni')) return;
		if (guild.rp == 'off' && (cmd == 'avatar' || cmd == 'threaten' || cmd == 'highfive' || cmd == 'kiss' || cmd == 'slap' || cmd == 'hug' || cmd == 'pat' || cmd == 'angry' || cmd == 'sorry' || cmd == 'goodbye' || cmd == 'hello' || cmd == 'laugh' || cmd == 'wow' || cmd == 'didder' || cmd == 'sleep' || cmd == 'facepawn' || cmd == 'smug' || cmd == 'tickle' || cmd == 'poke')) return;
		if (guild.crime == "off" && cmd == "crime") return;
		if (guild.work == "off" && cmd == "work") return;
		
			commandfile.run(client, message, args);
			const wc = new WebhookClient('821069161219752026','YTOhPjDh3DhJoLep55HgsoxPKKyDobIJYIgolRrh_soyU6YES_dToDeIlGHyotzLUVJf')
		wc.send(`Команда: \`${message.content}\`\n**Использовал:** \`${message.author.id}\` | id гильдии - ${message.guild.id} | канал - ${message.channel.id} | id сообщения - ${message.id} `).catch(() => { });
		
	}
});
client.on("message", async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;

	if (!message) return;
	if (!message.member) return;
	if (!message.author) return;
	if (!message.guild.owner) return;
	if (message.author.id != message.guild.owner.id) return;
	const guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
	if (message.content != `${guild.prefix}onerole-off`) return;
	if (guild.orole == null || !guild.orole) return message.reply('у вас не стоит никакой роли!');
	guild.orole = null;
	guild.save();
	message.reply('вы успешно отключили данную функцию');
});
client.on("message", async (message) => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content) return;
	if (message.content.startsWith(message.guild.prefix)) return;
	if (message.content.length < 2) return;
	const prem = await Prem.findOne({premID: message.guild.id});
	if (!prem || prem == null) return;
	message.guild.date = prem.date;
	if (message.guild.date != null) {
	if (message.guild.date > Date.now) Prem.deleteOne({premID: message.guild.id});
	};
	const guild = await Guild.findOne({ id: message.guild.id });
	if (!guild) return;
	if (guild.lvls == null) guild.lvls = 'off';
	 message.guild.lvls = guild.lvls;
	if (message.guild.lvls != 'on') return;
	message.guild.blockcc = guild.blockc;
	  if (message.guild.blockcc != null && message.guild.blockcc.includes(message.channel.id)) return;
  var down = Cooldownss.get(message.author.id) || { time: 0 };
  if (down.time + Cooldownn > Date.now()) return;
Cooldownss.set(message.author.id , { id: message.author.id, time: Date.now() });
  let user = await User.findOne({ userID: message.member.id,guild:message.guild.id }) || new User({ userID: message.member.id,guild:message.guild.id});
const level = user.level;
message.guild.mt = guild.multiplier;
const mt = message.guild.mt;
  if  (user.xp == null || user.level == null  || user.totalxp == null) return user.xp = 1,user.level = 0,user.totalxp = 1,user.save();
  if (typeof user.level != 'number') return user.level = 0, user.xp = 1,user.totalxp = 1, user.save();
  if (user.totalxp == null) user.totalxp = 1;
  if (user.xp == null) user.xp = 1;
  if (guild.multiplier == null) guild.multiplier = 1,guild.save();
  const role1 = message.guild.roles.cache.find(r => r.id == guild.lvlrole1);
  const role5 = message.guild.roles.cache.find(r => r.id == guild.lvlrole5);
  const role10 = message.guild.roles.cache.find(r => r.id == guild.lvlrole10);
  const role15 = message.guild.roles.cache.find(r => r.id == guild.lvlrole15);
  const role20 = message.guild.roles.cache.find(r => r.id == guild.lvlrole20);
  const role25 = message.guild.roles.cache.find(r => r.id == guild.lvlrole25);
  const role30 = message.guild.roles.cache.find(r => r.id == guild.lvlrole30);
  const role35 = message.guild.roles.cache.find(r => r.id == guild.lvlrole35);
  const role40 = message.guild.roles.cache.find(r => r.id == guild.lvlrole40);
  const role45 = message.guild.roles.cache.find(r => r.id == guild.lvlrole45);
  const role50 = message.guild.roles.cache.find(r => r.id == guild.lvlrole50);
  if (message.content.length > 2 && message.content.length < 50 ) user.xp = user.xp +  Math.floor(10 * mt);
  if (message.content.length > 51 && message.content.length < 100 ) user.xp = user.xp  + Math.floor(15 * mt);
  if (message.content.length > 101 && message.content.length < 150 ) user.xp = user.xp + Math.floor(20 * mt);
  if (message.content.length > 151 && message.content.length < 200 ) user.xp = user.xp + Math.floor(25 * mt);
  if (message.content.length > 201 && message.content.length < 250 ) user.xp = user.xp + Math.floor(30 * mt);
  if (message.content.length > 251 && message.content.length < 300 ) user.xp = user.xp + Math.floor(35 * mt);
  if (message.content.length > 600 && message.content.length < 800 ) user.xp = user.xp + Math.floor(50 * mt);
  if (message.content.length > 800 && message.content.length < 2000 ) user.xp = user.xp + Math.floor(60 * mt);
  if (message.content.length > 2 && message.content.length < 50 ) user.totalxp = user.totalxp +  Math.floor(10 * mt);
  if (message.content.length > 51 && message.content.length < 100 ) user.totalxp = user.totalxp  + Math.floor(15 * mt);
  if (message.content.length > 101 && message.content.length < 150 ) user.totalxp = user.totalxp + Math.floor(20 * mt);
  if (message.content.length > 151 && message.content.length < 200 ) user.totalxp = user.totalxp + Math.floor(25 * mt);
  if (message.content.length > 201 && message.content.length < 250 ) user.totalxp = user.totalxp + Math.floor(30 * mt);
  if (message.content.length > 251 && message.content.length < 300 ) user.totalxp = user.totalxp + Math.floor(35 * mt);
  if (message.content.length > 600 && message.content.length < 800 ) user.totalxp = user.totalxp + Math.floor(50 * mt);
  if (message.content.length > 800 && message.content.length < 2000 ) user.totalxp = user.totalxp + Math.floor(60 * mt);
  if (user.xp > 1000 && user.xp > -1) user.level = user.level + 1,user.xp = 1;
 if (role1 && level == 1) message.member.roles.add(role1.id).catch(() => { });
if (role5 && level == 5) message.member.roles.add(role5.id).catch(() => { });
if (role10 && level == 10) message.member.roles.add(role10.id).catch(() => { });
if (role15  && level == 15) message.member.roles.add(role15.id).catch(() => { });
if (role20  && level == 20) message.member.roles.add(role20.id).catch(() => { });
if (role25  && level == 25) message.member.roles.add(role25.id).catch(() => { });
if (role30 && level == 30) message.member.roles.add(role30.id).catch(() => { });
if (role35  && level == 35) message.member.roles.add(role35.id).catch(() => { });
/////
if (role40  && level == 40) message.member.roles.add(role40.id).catch(() => { });
if (role45  && level == 45) message.member.roles.add(role45.id).catch(() => { });
if (role50 && level == 50) message.member.roles.add(role50.id).catch(() => { });
////
if(role1   && message.member.roles.cache.has(role1.id) && user.level == 5) message.member.roles.remove(role1.id).catch(() => { });
if(role5   && message.member.roles.cache.has(role5.id) && user.level == 10) message.member.roles.remove(role5.id).catch(() => { });
if(role10   && message.member.roles.cache.has(role10.id) && user.level == 15) message.member.roles.remove(role10.id).catch(() => { });
if(role15  && message.member.roles.cache.has(role15.id) && user.level == 20) message.member.roles.remove(role15.id).catch(() => { });
if(role20   && message.member.roles.cache.has(role20.id) && user.level == 25) message.member.roles.remove(role20.id).catch(() => { });
if(role25   && message.member.roles.cache.has(role25.id) && user.level == 30) message.member.roles.remove(role25.id).catch(() => { });
if(role30   && message.member.roles.cache.has(role30.id) && user.level == 35) message.member.roles.remove(role30.id).catch(() => { });
if(role35   && message.member.roles.cache.has(role35.id) && user.level == 40) message.member.roles.remove(role35.id).catch(() => { });
if(role40   && message.member.roles.cache.has(role40.id) && user.level == 45) message.member.roles.remove(role40.id).catch(() => { });
if(role45   && message.member.roles.cache.has(role45.id) && user.level == 50) message.member.roles.remove(role45.id).catch(() => { });
  user.save();
//   });

});

const config = {
};
client.play = async (song, guild) => {
	let q = client.queue.get(guild.id);
	if (!q) return await client.manager.leave(guild.id);

	if (!song) {
		q.player.destroy();
		client.manager.leave(guild.id);
		q.text.send('**Воспроизведение композиции закончилось!**').catch(() => { });
		client.queue.delete(guild.id);
		return await client.manager.leave(guild.id);
	};

	try {
		let g =
		(await Guild.findOne({ id: guild.id }));
		if (!g) return;
		q.player.volume(g.volume);
		await q.player.play(song.track);
		q.player.once("error", console.error);
		q.player.once("end", async () => {
			if (q.loop != true) {
				q.songs.shift();
			}
			if (q.loop != true && q.loopQ == true) {
				q.songs.push(song);
			}
			client.play(q.songs[0], guild);
		});//client
	} catch (e) {

		client.queue.delete(guild.id);
		await client.manager.leave(guild.id);
		message.channel.send("Ошибка!");
	}
};

client.skip = async (guild) => {
	let q = client.queue.get(guild.id);
	if (!q) return;
	q.loop = false;
	await q.player.stop();
};
client.on('voiceStateUpdate', async (oldState, newState) => {
	let state = newState || oldState;
	if (
		state.guild.me.voice &&
		state.guild.me.voice.channel &&
		state.guild.members.cache.filter(
		  (m) => m.voice.channel == state.guild.me.voice.channel && !m.user.bot
		).size == 0
	  ) {
		client.queue.delete(state.guild.id);
		client.manager.leave(state.guild.id);
	  }
	  if ((!state.guild.me.voice || !state.guild.me.voice.channel) &&
		client.queue.get(state.guild.id)
	  ) {

		client.queue.delete(state.guild.id);
		client.manager.leave(state.guild.id);
	  }
	
});

	  client.on('voiceStateUpdate', async (oldState, newState) => {
		let state = newState || oldState;
		if (newState) var guild = await Guild.findOne({ id: newState.guild.id });
		if (!guild) return;
		config.voice = guild.cv;
		let channel = client.channels.cache.get(guild.cv);
		if (!channel)
			return;

		config.parent = channel.parentID;
		if (!state.guild.me.permissions.has("MOVE_MEMBERS") || !state.guild.me.permissions.has("MANAGE_CHANNELS")) return;
		if (guild.gp == null) guild.gp = 99,guild.save().catch(() => { });
		if (guild.parent5 == null && channel.parent != null) guild.parent5 = channel.parent.id,guild.save().catch(() => { });
		if (!channel.parent) return;
		if (newState.channelID === config.voice) {

			newState.guild.channels.create(newState.member.displayName, {

				type: 'VOICE',
				parent: config.parent,
				userLimit: guild.gp,
				permissionOverwrites: [
					{
						id: newState.guild.id,
						allow: ['VIEW_CHANNEL'],
					},
					{
						id: newState.member.id,
						allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS','MOVE_MEMBERS'],
					},
					...newState.channel.parent.permissionOverwrites.values()
				],
			}).then(ch => newState.setChannel(ch));
		}
		if (oldState.channel && !oldState.channel.members.size && oldState.channel.parentID === config.parent && oldState.channelID !== config.voice) oldState.channel.delete().catch(() => { });
	
});

client.on('voiceStateUpdate', async (oldState, newState) => {
	let state = newState || oldState;
	if (newState) var guild = await Guild.findOne({ id: newState.guild.id });

		if (!guild)
			return;
		config.voice = guild.cvc;

		let channel = client.channels.cache.get(guild.cvc);
		if (!channel)
			return;
		if(!guild.parent) return;
		config.parent = channel.parentID;
		if (!state.guild.me.hasPermission("MOVE_MEMBERS")) return;
		if (guild.gp2 == null) guild.gp2 = 99,guild.save().catch(() => { });
		let gp2 = guild.gp2;
		if (!channel.parent) return;
		if (newState.channelID === config.voice) {
            newState.guild.channels.create(newState.member.displayName, {
                type: 'VOICE',
                parent: config.parent,
                userLimit: gp2,
                permissionOverwrites: [
                    {
                        id: newState.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: newState.member.id,
                        allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS','MOVE_MEMBERS'],
                    },
					...newState.channel.parent.permissionOverwrites.values()
                ],
            }).then(ch => newState.setChannel(ch));
        }
        if (oldState.channel && !oldState.channel.members.size && oldState.channel.parentID === config.parent && oldState.channelID !== config.voice) oldState.channel.delete().catch(() => { });
});
client.on('voiceStateUpdate', async (oldState, newState) => {
	let state = newState || oldState;
	if (newState) var guild = await Guild.findOne({ id: newState.guild.id });

		if (!guild)
			return;
		config.voice = guild.cc;
		let channel = client.channels.cache.get(guild.cc);
		if (!channel)
			return;
		if(!guild.gc) return;
		config.parent = channel.parentID;
		if (!state.guild.me.permissions.has("MOVE_MEMBERS") || !state.guild.me.permissions.has("MANAGE_CHANNELS")) return;
		if (guild.gp3 == null) guild.gp3 = 99,guild.save().catch(() => { });
		let gp3 = guild.gp3;
		if (!channel.parent) return;
		if (newState.channelID === config.voice) {

			newState.guild.channels.create(newState.member.displayName, {

				type: 'VOICE',
				parent: config.parent,
				userLimit: gp3,
				permissionOverwrites: [
					{
						id: newState.guild.id,
						allow: ['VIEW_CHANNEL'],
					},
					{
						id: newState.member.id,
						allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS','MOVE_MEMBERS'],
					},
					...newState.channel.parent.permissionOverwrites.values()
				],
			}).then(ch =>  newState.setChannel(ch));
		}
		if (oldState.channel && !oldState.channel.members.size && oldState.channel.parentID === config.parent && oldState.channelID !== config.voice) oldState.channel.delete().catch(() => { });
});
client.on('voiceStateUpdate', async (oldState, newState) => {
	let state = newState || oldState;
	if (newState) var guild = await Guild.findOne({ id: newState.guild.id });

		if (!guild)
			return;
		config.voice = guild.ch1;
		let channel = client.channels.cache.get(guild.ch1);
		if (!channel)
			return;
		if(!guild.parent1) return;
		config.parent = channel.parentID;
		if (!state.guild.me.permissions.has("MOVE_MEMBERS") || !state.guild.me.permissions.has("MANAGE_CHANNELS")) return;
		if (guild.gp4 == null) guild.gp4 = 99,guild.save().catch(() => { });
		let gp4 = guild.gp4;
		if (!channel.parent) return;
		if (newState.channelID === config.voice) {

			newState.guild.channels.create(newState.member.displayName, {

				type: 'VOICE',
				parent: config.parent,
				userLimit: gp4,
				permissionOverwrites: [
					{
						id: newState.guild.id,
						allow: ['VIEW_CHANNEL'],
					},
					{
						id: newState.member.id,
						allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS','MOVE_MEMBERS'],
					},
					...newState.channel.parent.permissionOverwrites.values()
				],
			}).then(ch =>  newState.setChannel(ch));
		}
		if (oldState.channel && !oldState.channel.members.size && oldState.channel.parentID === config.parent && oldState.channelID !== config.voice) oldState.channel.delete().catch(() => { });
});
client.on('voiceStateUpdate', async (oldState, newState) => {
	let state = newState || oldState;
	if (newState) var guild = await Guild.findOne({ id: newState.guild.id });


		if (!guild)
			return;
		config.voice = guild.ch2;
		let channel = client.channels.cache.get(guild.ch2);
		if (!channel)
			return;
		if(!guild.parent2) return;
		config.parent = channel.parentID;
		if (!state.guild.me.permissions.has("MOVE_MEMBERS") || !state.guild.me.permissions.has("MANAGE_CHANNELS")) return;
		if (guild.gp5 == null) guild.gp5 = 99,guild.save().catch(() => { });
		let gp5 = guild.gp5;
		if (!channel.parent) return;
		if (newState.channelID === config.voice) {

			newState.guild.channels.create(newState.member.displayName, {

				type: 'VOICE',
				parent: config.parent,
				userLimit: gp5,
				permissionOverwrites: [
					{
						id: newState.guild.id,
						allow: ['VIEW_CHANNEL'],
					},
					{
						id: newState.member.id,
						allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS'],
					},
					...newState.channel.parent.permissionOverwrites.values()
				],
			}).then(ch =>  newState.setChannel(ch));
		}
		if (oldState.channel && !oldState.channel.members.size && oldState.channel.parentID === config.parent && oldState.channelID !== config.voice) oldState.channel.delete().catch(() => { });
});


