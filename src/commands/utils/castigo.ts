import { CommandInteraction, Message } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const command = {
  data: new SlashCommandBuilder()
    .setName('castigo')
    .setDescription('Coloque alguém de castigo!')
    .addUserOption((option) =>
      option
        .setName('alvo')
        .setDescription('Quem você deseja colocar de castigo?')
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const target = await interaction.options.getUser('alvo');
    const { guild } = interaction;

    const targetMember = guild.members.cache.get(target.id);
    const roles = targetMember.roles.cache
      .filter((role) => role.id !== guild.id)
      .map((role) => role.id);

    const punishmentRole = guild.roles.cache.get(
      process.env.PUNISHMENT_ROLE_ID,
    );

    const message = (await interaction.reply({
      content: `**CASTIGO**:\n\nO povo deseja castigar ${target}, se você concorda, reaja a esta mensagem com ✅, se não, vote com ❌.\n\nA votação dura 1 minuto e requer 5 votos, se não houver 5 votos até o final, será cancelada e ninguém será castigado.`,
      fetchReply: true,
    })) as Message;

    message.react('✅');
    message.react('❌');

    const getTempRole = (role) => guild.roles.cache.get(role);

    const emojiFilter = (reaction, user) => {
      console.log(['✅', '❌'].includes(reaction.emoji.name), !user.bot);
      return ['✅', '❌'].includes(reaction.emoji.name) && !user.bot;
    };

    try {
      const collected = await message.awaitReactions({
        filter: emojiFilter,
        max: 3,
        time: 60000,
        errors: ['time'],
      });

      const votes = collected.map(({ emoji, count }) => ({
        name: emoji.name,
        count,
      }));
      const upvote = votes.filter((vote) => vote.name === '✅')[0]?.count || 0;
      const downvote =
        votes.filter((vote) => vote.name === '❌')[0]?.count || 0;

      console.log(upvote, downvote);
      if (upvote > downvote) {
        await targetMember.roles.set([punishmentRole]);

        interaction.followUp(`${target} foi castigado por 5 minutos!`);

        setTimeout(async () => {
          const rolesToAdd = [];
          roles.forEach((role) => {
            const tempRole = getTempRole(role);
            if (tempRole.id !== punishmentRole.id) {
              rolesToAdd.push(tempRole);
            }
          });

          await targetMember.roles
            .set(rolesToAdd)
            .catch(() =>
              interaction.followUp(`Não foi possível descastigar ${target}`),
            );
          interaction.followUp(`${target} foi descastigado!`);
        }, 300000);
      } else {
        await interaction.followUp(
          `A maioria votou ❌ e o castigo para ${target} foi cancelado!`,
        );
      }
    } catch (err) {
      console.log(err);
      interaction.followUp(
        `Acabou o tempo e a votação não atingiu um resultado.\n${target} não será castigado.`,
      );
    }
  },
};

export default command;
