var Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');


module.exports.run = async(client, message, args) => {
  
  
  let pravv = new MessageEmbed()
  .setAuthor('Ошибка ❌')
  .setDescription(`**${message.author}, у Вас нехватка прав.\nТребуемые права: \`Банить участников\`**`)
  .setColor("#d30d27")
  if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(pravv);
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return  message.reply('**У меня нет необходимых прав.\n> Выдайте право  ,,Банить участников"** ').catch(() => {});

    let user = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
 
    if(!user) return message.reply('укажи пользователя!')
    if(user.permissions.has("BAN_MEMBERS")) return  message.reply('**не нужно банить модератора!**').catch(() => {});

  let as = new MessageEmbed()
  .setDescription('**ты не можешь себя забанить!**')
  .setColor("RED")
    if(user.id === message.author.id) return  message.channel.send({embed:as})
    let em = new MessageEmbed()
    .setDescription('**этот пользователь не может быть забанен. Возможно, что он является модератором / администратором, либо их роль выше моей!**')
    .setColor("RED")
    if(!user.bannable) return  message.channel.send({embed:em});
    var reason = args.splice(1).join(' ');
    if(!reason) reason = 'без причины';
  
 
    var embed = new MessageEmbed()
    .setTitle('Вы были забанены!')
 
    .setColor("RED")
    .setDescription(`Причина: \`${reason}\`\n**Бан выдал: ${message.author.tag}**`)
    .setFooter(`Mira bot`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
    user.send({embed:embed}).catch(() =>{})

    let ch = client.channel.cache.get("840059609649905704")
    let emb = new MessageEmbed()
    .setDescription(`**${user}** был забанен модератором: **${message.author}**\nПричина бана: \`${reason}\``)
    .setColor("RED")
    ch.send({embed:emb}).catch(() => {});
    await user.ban({reason:reason}).catch(() => {});
};
    module.exports.help = {
        name: "бан",
        desc:'банит пользователя',
        prime:'ban @пользователь <причина>'
      };
