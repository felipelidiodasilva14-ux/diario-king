
require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const comandos = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Verifica se o Diario King está online"),

  new SlashCommandBuilder()
    .setName("ajuda")
    .setDescription("Mostra os comandos do Diario King")
].map(command => command.toJSON());

client.once("ready", async () => {
  console.log(`DIARIO KING online como ${client.user.tag}`);

  const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: comandos }
    );

    console.log("Comandos registrados com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar comandos:", error);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("👑 DIARIO KING está online!");
  }

  if (interaction.commandName === "ajuda") {
    await interaction.reply({
      content: "👑 Bem-vindo ao DIARIO KING!\n\nSistema em desenvolvimento.",
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
