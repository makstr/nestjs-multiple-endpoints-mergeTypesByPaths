import { Component, UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, DelegateProperty } from '@nestjs/graphql';


@Resolver('Author')
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query('author')
  async getAuthor(obj, args, context, info) {
    const { id } = args;
    return await this.authorsService.findOneById(id);
  }

  @ResolveProperty('posts')
  async getPosts(author) {
    const { id } = author;
    return await this.postsService.findAll({ authorId: id });
  }
}
