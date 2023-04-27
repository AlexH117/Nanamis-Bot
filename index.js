const { Client, GatewayIntentBits, Partials, Message } = require("discord.js");
const { token, prefix, openaiApiKey } = require("./config.json");
const { ChatBot } = require("discord-chatbot");
const openai = require("openai-api");

const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],

  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ]
});

const chatbot = new ChatBot({ name: "Nanami", openaiApiKey: openaiApiKey });
// generateResponse(message.content, openaiAPI)
const openaiAPI = new openai(openaiApiKey);

//No borrar________________________________________
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});
//_________________________________________________

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("!") && !message.author.bot) {
    const response = await chatbot.generateResponse(message.content, openaiAPI);
    message.reply(response);
  }
});

client.login(token);
