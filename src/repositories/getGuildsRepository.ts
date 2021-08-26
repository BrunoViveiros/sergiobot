import { getRepository } from "typeorm";

import Guild from "../models/Guild";

const getGuildsRepository = () => {
    return getRepository(Guild)
}

export default getGuildsRepository
