
const { inspect } = require('util');
module.exports.run = async (client, message, args) => {
if (message.author.id != '375274737103798282') return;
let code = args.join(" ");
if (!code) return message.reply("укажи чет");
try {
    let result = await eval(code);
    let out = result;
    if (typeof result !== 'string') {
        out = inspect(result);
    }
    message.channel.send(out,{code:"js"})
} catch (error) {
    message.channel.send("ошибОчка")
}
}



module.exports.help = {
	name: 'eval',
};