import { getRepository } from 'typeorm';

import Guild from '../models/Guild';

const getGuildsRepository = () => getRepository(Guild);

export default getGuildsRepository;
