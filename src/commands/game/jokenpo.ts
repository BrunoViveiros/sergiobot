import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const command = {
  data: new SlashCommandBuilder()
    .setName('jokenpo')
    .setDescription('Jogue pedra, papel ou tesoura')
    .addStringOption((option) =>
      option
        .setName('jogada')
        .setDescription('Qual vai ser sua jogada?')
        .setRequired(true)
        .addChoice('Pedra', 'rock')
        .addChoice('Papel', 'paper')
        .addChoice('Tesoura', 'scissors'),
    ),
  async execute(interaction: CommandInteraction) {
    interaction.reply(`Placeholder`);
  },
};

export default command;
