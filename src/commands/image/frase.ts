import { CommandInteraction, MessageAttachment, BufferResolvable } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Canvas, resolveImage } from 'canvas-constructor/skia'; 
import fetch from 'node-fetch'

const backgrounds = [
  'https://i.ibb.co/Wsdcd2x/berti.png',
  'https://i.ibb.co/B3f3gJW/philo.png',
  'https://i.ibb.co/9gkQy9N/chaves.png',
  'https://i.ibb.co/k5qJ2LD/edukof.png',
  'https://i.ibb.co/fv7bNw8/tony-stark.png',
  'https://i.ibb.co/yYfCNDJ/dilma.png',
  'https://i.ibb.co/CWtnVvt/holt.png',
  'https://i.ibb.co/0jfQbxp/gilbala.png',
]

const command = {
data: new SlashCommandBuilder().setName('frase').setDescription('Crie uma frase famosa'),
  async execute(interaction: CommandInteraction) {
    const index = Math.floor(Math.random() * backgrounds.length);
    // const bg = await fetch(backgrounds[index]);
    const bg = await resolveImage(backgrounds[index])
    
    const img = new Canvas(600, 315).printImage(bg, 0, 0, 600, 315);

    const imgBuffer = await img.toBuffer('png');
    const attachment  = new MessageAttachment(imgBuffer, 'frase.png');

    await interaction.reply({files: [attachment]});
  },
};

export default command;
