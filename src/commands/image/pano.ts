import { CommandInteraction, MessageAttachment } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Canvas, resolveImage } from 'canvas-constructor/skia';

const IMAGE =
  'https://i.pinimg.com/736x/bd/1b/8a/bd1b8a5cf03ed3a414fe19b0312010a9.jpg';

const command = {
  data: new SlashCommandBuilder()
    .setName('pano')
    .setDescription('Passe pano para alguém')
    .addStringOption((option) =>
      option
        .setName('alvo')
        .setDescription('Vai passar pano para quem?')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('pronome')
        .setDescription('Qual o pronome do alvo? (padrão: ele)')
        .addChoice('ele', 'e')
        .addChoice('ela', 'a')
        .addChoice('elu', 'u'),
    ),
  async execute(interaction: CommandInteraction) {
    const bg = await resolveImage(IMAGE);

    const suffix = interaction.options.getString('pronome') || 'e';

    const target = interaction.options.getString('alvo');

    const img = new Canvas(720, 521)
      .printImage(bg, 0, 0, 720, 521)
      .setTextFont('34px')
      .setTextAlign('center')
      .setColor('#fff')
      .printWrappedText(`aiai ess${suffix} ${target}`, 530, 300, 260);

    const imgBuffer = await img.toBuffer('png');
    const attachment = new MessageAttachment(imgBuffer, 'pano.png');

    await interaction.reply({ files: [attachment] });
  },
};

export default command;
