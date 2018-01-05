import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsResolvers } from './dogs.resolvers';

@Module({
  components: [DogsService, DogsResolvers],
})
export class DogsModule {}
