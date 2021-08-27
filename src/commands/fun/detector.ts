import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const command = {
data: new SlashCommandBuilder().setName('detector').setDescription('Detecte quem é'),
  async execute(interaction: CommandInteraction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('test-button').setLabel('clique aqui se voce é').setStyle('DANGER')
    )

    await interaction.reply({content: 'Detector ativo!', components: [row]});
  },
};

export default command;
