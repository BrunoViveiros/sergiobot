import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const command = {
  data: new SlashCommandBuilder()
    .setName('moeda')
    .setDescription('Jogue cara ou coroa'),
  async execute(interaction: CommandInteraction) {
    const result = Math.floor(Math.random() * 2);

    interaction.reply(`Você tirou ${result ? 'cara' : 'coroa'}`);
  },
};

export default command;
