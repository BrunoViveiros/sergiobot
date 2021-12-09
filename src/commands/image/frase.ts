import { CommandInteraction, MessageAttachment } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Canvas, resolveImage } from 'canvas-constructor/skia';

const backgrounds = [
  'https://i.ibb.co/Wsdcd2x/berti.png',
  'https://i.ibb.co/B3f3gJW/philo.png',
  'https://i.ibb.co/9gkQy9N/chaves.png',
  'https://i.ibb.co/k5qJ2LD/edukof.png',
  'https://i.ibb.co/fv7bNw8/tony-stark.png',
  'https://i.ibb.co/yYfCNDJ/dilma.png',
  'https://i.ibb.co/CWtnVvt/holt.png',
  'https://i.ibb.co/0jfQbxp/gilbala.png',
];

const command = {
  data: new SlashCommandBuilder()
    .setName('frase')
    .setDescription('Crie uma frase famosa')
    .addStringOption((option) =>
      option
        .setName('quote')
        .setDescription('Escreva a frase')
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const index = Math.floor(Math.random() * backgrounds.length);
    const bg = await resolveImage(backgrounds[index]);

    const quote = interaction.options.getString('quote');

    try {
      const img = new Canvas(600, 315)
        .printImage(bg, 0, 0, 600, 315)
        .setTextFont('24px')
        .setColor('#fff')
        .printWrappedText(`— ${quote}`, 30, 80, 300);

      const imgBuffer = await img.toBuffer('png');
      const attachment = new MessageAttachment(imgBuffer, 'frase.png');

      await interaction.reply({ files: [attachment] });
    } catch {
      await interaction.reply({
        content: 'Não consegui fazer a frase',
        ephemeral: true,
      });
    }
  },
};

export default command;
