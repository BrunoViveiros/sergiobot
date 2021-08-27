import getGuildsRepository from '../repositories/getGuildsRepository';

interface params {
  name: string;
}

class CreateGuildService {
  execute({ name }: params) {
    const guildsRepository = getGuildsRepository();
    guildsRepository.save({ name });
  }
}

export default CreateGuildService;
