const Discord = require("discord.js");
const { Client, IntentsBitField } = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
  ],
  presence: {
    status: "online", //idle, dnd.
  },
});
let token =""; //bot's token.

client.on('ready', async =>{
    if(!client.user){
        return;
    }
    console.log(`\x1b[33m [${client.user.username}]\x1b[0m is now Online.`);
  
})

  client.on("messageCreate", async (message) => {
  if (message.content === ".ping") {
    let ping = `${Date.now() - message.createdTimestamp}`;
    let api_ping = client.ws.ping; //Declaring our Api_Ping.
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor("Blurple")
          .setAuthor({name: `Pong`, iconURL: client.user.displayAvatarURL({ dynamic: true })})
          .setFooter({
           text: `Requested by ${message.author.username}`,
           iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
          .addFields([
            {
              name: "Bot Latency",
              value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``,
              inline: true,
            },
            {
              name: "API Latency",
              value: `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``,
              inline: true,
            },
          ])
          .setTimestamp(),
      ],
      components: [
        new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("deadbutton")
            .setStyle(2)
            .setDisabled(true)
            .setLabel("Pong 🏓")
        ),
      ],
    }); //Client's Response to .ping, with our embed
  }
});

client.login(token);