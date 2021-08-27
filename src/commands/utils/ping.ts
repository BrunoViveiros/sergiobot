import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const command = {
data: new SlashCommandBuilder().setName('ping').setDescription('Responde com pong'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply({content: ':ping_pong: Pong!'});
  },
};

export default command;
