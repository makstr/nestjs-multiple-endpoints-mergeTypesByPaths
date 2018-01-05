import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolvers } from './authors.resolvers';

@Module({
  imports: [PostsModule],
  components: [AuthorsService, AuthorResolver],
})
export class AuthorsModule {}
