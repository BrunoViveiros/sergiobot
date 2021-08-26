import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import CreateGuildService from '../../services/createGuildService';


const command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with pong'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply(':ping_pong: Pong!');
    const createGuild = new CreateGuildService()
    createGuild.execute({name:'inferno'})
  },
};

export default command;
