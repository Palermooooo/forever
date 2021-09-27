const User = require("../user.js");
const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  let users = await User.find({guild:message.guild.id, totalxp: {$ne: null}}).sort( { totalxp: -1 } ).limit(10);
  let text = '';
let n = 0;
  for(const user of users){
   n++;
   text += `**${n}) <@${user.userID}>:${user.msg} сообщений 💬**\n`;
  };
  let top = await User.find({guild:message.guild.id, totalxp : { $gte: user.totalxp},
  }).countDocuments();
  const ihatekids = new Discord.MessageEmbed()
  .setAuthor(`Топ по сообщениям✉️`)
  .setDescription(`${text}`)
  .setColor(guild.emb)
  .setFooter(`Ваша позиция: ${top}, ${message.author.username}`)
  .setTimestamp()
  message.channel.send(ihatekids)
  };
module.exports.help = {
    name: "top",
}