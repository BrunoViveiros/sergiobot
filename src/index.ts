/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { resolve } from 'path';
import {
  Client, Intents, Collection,
} from 'discord.js';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { ICommand, IClient } from './types/common';

import './database/index.ts';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }) as IClient;

client.commands = new Collection();

fs.readdirSync(resolve(__dirname, 'commands')).forEach((dir) => {
  fs.readdirSync(resolve(__dirname, 'commands', dir)).filter((file) => file.endsWith('.ts')).forEach((file) => {
    const { default: command } = require(resolve(__dirname, 'commands', dir, file)) as {default: ICommand};
    client.commands.set(command.data.name, command);
  });
});

client.once('ready', () => {
  console.log('Bot pronto');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.on('interactionCreate', async(interaction) => {
  if(!interaction.isButton()) return;

  if(interaction.customId === 'test-button') {
    interaction.reply(`${interaction.user.username} iiiih`)
  }
});

client.login(process.env.TOKEN);
