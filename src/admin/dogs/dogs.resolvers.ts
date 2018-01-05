import { Component, UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, DelegateProperty } from '@nestjs/graphql';

import { Dog } from './interfaces/dog.interface';
import { DogsService } from './dogs.service';
import { DogsGuard } from './dogs.guard';
import { MergeInfo } from 'graphql-tools/dist/Interfaces';

@Resolver('Dog')
export class DogsResolvers {
  constructor(private readonly dogsService: DogsService) {}

  @Query()
  @UseGuards(DogsGuard)
  async getDogs() {
		console.log ('dogs.resolver.getDogs')
    return await this.dogsService.findAll();
  }

  @Query('dog')
  async findOneById(id: number) {
    return await this.dogsService.findOneById(id);
  }

  @Mutation('createDog')
  async create(dog: Dog) {
    await this.dogsService.create(dog);
  }

  @DelegateProperty('human')
  findHumansById() {
    return (mergeInfo: MergeInfo) => ({
      fragment: `fragment DogFragment on Dog { humanId }`,
      resolve(parent, args, context, info) {
        const humanId = parent.id;
        return mergeInfo.delegate(
          'query',
          'humanById',
          {
            id: humanId,
          },
          context,
          info,
        );
      },
    });
  }
}
