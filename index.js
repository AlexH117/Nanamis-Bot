require('dotenv').config();
const {
    Client,
    GatewayIntentBits,
    Partials
} = require('discord.js');
const {
    Configuration,
    OpenAIApi
} = require('openai');
const client = new Client({
    partials: [Partials.Channel, Partials.Message, Partials.GuildMember],
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates]
});
let data = {
    GPT_API_KEY: process.env.GPT_API_KEY,
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN
};

const configuration = new Configuration({
    apiKey: data.GPT_API_KEY
});
const openai = new OpenAIApi(configuration);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const response = await generateResponse(message.content);
    message.channel.send(response);
});

async function generateResponse(prompt) {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-002',
            prompt,
            max_tokens: 1024,
            n: 1
        });
        
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating response:', error.response ? error.response.data : error);
        return 'Sorry, I am unable to generate a response at this time.';
    }
}

client.login(data.DISCORD_BOT_TOKEN);

// const { Client, GatewayIntentBits, Partials, Message } = require('discord.js');
// const { token, prefix, openaiApiKey } = require("./config.json");
// const { ChatBot } = require('discord-chatbot');
// const openai = require('openai-api')

// const client = new Client({
//   intents: [
//     GatewayIntentBits.AutoModerationConfiguration,
//     GatewayIntentBits.AutoModerationExecution,
//     GatewayIntentBits.DirectMessageReactions,
//     GatewayIntentBits.DirectMessageTyping,
//     GatewayIntentBits.DirectMessages,
//     GatewayIntentBits.GuildIntegrations,
//     GatewayIntentBits.GuildInvites,
//     GatewayIntentBits.GuildMembers,
//     GatewayIntentBits.GuildMessageReactions,
//     GatewayIntentBits.GuildMessageTyping,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.GuildModeration,
//     GatewayIntentBits.GuildPresences,
//     GatewayIntentBits.GuildScheduledEvents,
//     GatewayIntentBits.GuildVoiceStates,
//     GatewayIntentBits.GuildWebhooks,
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.MessageContent
//   ],

//   partials: [
//     Partials.Channel,
//     Partials.GuildMember,
//     Partials.GuildScheduledEvent,
//     Partials.Message,
//     Partials.Reaction,
//     Partials.ThreadMember,
//     Partials.User
//   ]
// });

// const chatbot = new ChatBot({ name: 'Nanami', openaiApiKey: openaiApiKey});
// const openaiAPI = new openai(openaiApiKey);

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}`);
// });

// client.on('messageCreate', async message => {
//   if (!message.content.startsWith('!Nanami') && !message.author.bot) {
//     const response = await chatbot.generateResponse(message.content, openaiAPI);
//     message.reply(response);
//   }
// });

// client.login(token);
