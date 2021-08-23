import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { resolve } from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const clientId = process.env.CLIENT_ID;

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const commands = [];

fs.readdirSync(resolve(__dirname, '..', 'src', 'commands')).forEach((dir) => {
  fs.readdirSync(resolve(__dirname, '..', 'src', 'commands', dir)).filter((file) => file.endsWith('.ts')).forEach((file) => {
    const command = require(resolve(__dirname, '..', 'src', 'commands', dir, file));
    commands.push(command.default.data.toJSON());
  });
});

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
