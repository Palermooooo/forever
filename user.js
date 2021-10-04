var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new mongoose.Schema({
  userID:String,
  guild:String,
 muted: Boolean,
  muteinfo: String,
  time: String,
  guildid:String,
  unmute: Date,
  text:String,
  muteinfo1: String,
  time1: String,
  unmute1: Date,
  muteinfo2: String,
  time2: String,
  unmute2: Date,
  msg:{type:Number,default:0},
  muted11: Boolean,
  muteinfo11: String,
  time11: String,
  unmute11: Date,
  left11: Boolean,
  channel11: { type: Number, default: null},
  reason11: { type: String, default: 'не в муте'},
});

module.exports = mongoose.model("users", user);
