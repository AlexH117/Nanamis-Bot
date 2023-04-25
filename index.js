const { Client } = require('discord.js');
const { ChatBot } = require('discord-chatbot');
const openai = require('openai');
const { token, prefix, openaiApiKey } = require('./config.json');

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]
});

const chatbot = new ChatBot({ name: 'my-bot', openaiApiKey: openaiApiKey });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) && !message.author.bot) {
    const response = await chatbot.generateResponse(message.content);
    message.reply(response);
  }
});

client.login(token);
