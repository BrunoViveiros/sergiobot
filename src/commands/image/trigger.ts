import { CommandInteraction, MessageAttachment } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Swiftcord } from 'swiftcord';

const cord = new Swiftcord();

const command = {
  data: new SlashCommandBuilder()
    .setName('trigger')
    .setDescription('Alguem ta pistola')
    .addStringOption((option) =>
      option
        .setName('alvo')
        .setDescription('Quem está pistola? (URL)')
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const imageUrl = interaction.options.getString('alvo');

    const triggeredImage = await cord.trigger(imageUrl);

    const attachment = new MessageAttachment(triggeredImage, 'trigger.gif');

    await interaction.reply({ files: [attachment] });
  },
};

export default command;
