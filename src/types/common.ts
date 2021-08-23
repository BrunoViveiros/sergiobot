import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Client, Collection } from 'discord.js';

interface ICommand {
  data: SlashCommandBuilder,
  execute: (interaction: CommandInteraction) => Promise<void>;
}

interface IClient extends Client {
  commands: Collection<string, ICommand>
}

export { ICommand, IClient };
