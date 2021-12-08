import { CommandInteraction, MessageAttachment } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Canvacord } from 'canvacord';

const command = {
  data: new SlashCommandBuilder()
    .setName('changemymind')
    .setDescription('Crie o meme Change My Mind')
    .addStringOption((option) =>
      option
        .setName('mensagem')
        .setDescription('Qual a mensagem?')
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const message = interaction.options.getString('mensagem');

    try {
      const image = await Canvacord.changemymind(message);

      const attachment = new MessageAttachment(image, 'trigger.gif');

      await interaction.reply({ files: [attachment] });
    } catch {
      await interaction.reply('Não consegui fazer o trigger');
    }
  },
};

export default command;
