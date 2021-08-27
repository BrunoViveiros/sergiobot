import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as fs from 'fs';
import { resolve } from 'path';

const clientId = process.env.CLIENT_ID;

const command = {
  data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('Atualiza os comandos do servidor'),
  async execute(interaction: CommandInteraction) {
    if (interaction.user.id !== interaction.guild.ownerId) {
      interaction.reply({
        content: 'Apenas o dono do servidor pode executar este comando',
        ephemeral: true,
      });

      return;
    }

    const commands = [];
    fs.readdirSync(resolve(__dirname, '..')).forEach((dir) => {
      fs.readdirSync(resolve(__dirname, '..', dir))
        .filter((file) => file.endsWith('.ts'))
        .forEach((file) => {
          const commandData = require(resolve(__dirname, '..', dir, file));
          commands.push(commandData.default.data.toJSON());
        });
    });

    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    try {
      await rest.put(
        Routes.applicationGuildCommands(clientId, interaction.guild.id),
        {
          body: commands,
        },
      );

      interaction.reply({
        content: 'Comandos atualizados com sucesso!',
        ephemeral: true,
      });
    } catch (error) {
      interaction.reply({
        content: 'Não foi possível atualizar os comandos do servidor',
        ephemeral: true,
      });
    }
  },
};

export default command;
