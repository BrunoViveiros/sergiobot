import { CommandInteraction, MessageAttachment } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Canvas, resolveImage } from 'canvas-constructor/skia';

const IMAGE = 'https://i.ibb.co/PWpFskt/New-Project.png';

const command = {
  data: new SlashCommandBuilder()
    .setName('morrepraga')
    .setDescription('Mate alguma praga')
    .addStringOption((option) =>
      option
        .setName('praga')
        .setDescription('Quem deve morrer?')
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const bg = await resolveImage(IMAGE);

    const quote = interaction.options.getString('praga');

    const img = new Canvas(1080, 649)
      .printImage(bg, 0, 0, 1080, 649)
      .setTextFont('46px')
      .setTextAlign('center')
      .setColor('#000')
      .printWrappedText(quote, 260, 350, 120);

    const imgBuffer = await img.toBuffer('png');
    const attachment = new MessageAttachment(imgBuffer, 'morre.png');

    await interaction.reply({ files: [attachment] });
  },
};

export default command;
