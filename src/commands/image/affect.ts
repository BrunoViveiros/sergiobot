import { CommandInteraction, MessageAttachment } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Canvacord } from 'canvacord';

const command = {
  data: new SlashCommandBuilder()
    .setName('affect')
    .setDescription('Não, isso não afeta meu bebê')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('url')
        .setDescription('Usar uma imagem da internet')
        .addStringOption((option) =>
          option
            .setName('link')
            .setDescription('Link  da imagem')
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('user')
        .setDescription('Usar um avatar de usuário')
        .addUserOption((option) =>
          option
            .setName('alvo')
            .setDescription('Usuário alvo')
            .setRequired(true),
        ),
    ),
  async execute(interaction: CommandInteraction) {
    const subcommand = interaction.options.getSubcommand();
    let imageUrl;

    if (subcommand === 'url') {
      imageUrl = interaction.options.getString('link');
    } else if (subcommand === 'user') {
      const user = interaction.options.getUser('alvo');
      imageUrl = user.displayAvatarURL({ dynamic: true, format: 'png' });
    }

    try {
      const affectedImage = await Canvacord.affect(imageUrl);

      const attachment = new MessageAttachment(affectedImage, 'affected.png');

      await interaction.reply({ files: [attachment] });
    } catch {
      await interaction.reply({
        content: 'Não consegui fazer o affect',
        ephemeral: true,
      });
    }
  },
};

export default command;
