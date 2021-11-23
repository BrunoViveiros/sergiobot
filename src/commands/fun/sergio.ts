import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const answers = [
  'não.',
  'definitivamente não.',
  'não acredito que seja verdade.',
  'não é verdade.',
  'sim.',
  'definitivamente sim.',
  'sim, é verdade.',
  'todo mundo sabe que sim.',
  'não sei e nem quero saber.',
  'siga seu coração.',
  // eslint-disable-next-line prettier/prettier
  '\*\*\*.',
  'por favor me deixa em paz.',
  'parece que sim.',
  'acho que não.',
  'pode ser que sim, mas também pode ser que não.',
  'não posso revelar a verdade sobre isso.',
  'talvez não.',
  'de jeito nenhum.',
  'claro.',
  'talvez sim.',
  'me pergunta daqui 5 minutos.',
  'não sei e não quero saber.',
  'se você acredita que sim, essa é a resposta correta.',
];

const command = {
  data: new SlashCommandBuilder()
    .setName('sergio')
    .setDescription('Pergunte algo ao grande Sérgio.')
    .addStringOption((option) =>
      option
        .setName('pergunta')
        .setDescription('Qual vai ser sua pergunta?')
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const question = interaction.options.getString('pergunta');
    const answer = answers[Math.floor(Math.random() * answers.length)];

    interaction.reply(
      `Parece que você me perguntou "${question}"...\n\nE a minha resposta é: ${answer}`,
    );
  },
};

export default command;
