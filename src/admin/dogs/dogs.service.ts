import { Component } from '@nestjs/common';
import { Dog } from './interfaces/dog.interface';

@Component()
export class DogsService {
  private readonly dogs: Dog[] = [{ id: 1, name: 'Reksio', age: 5 }];

  create(dog: Dog) {
    this.dogs.push(dog);
  }

  findAll(): Dog[] {
    return this.dogs;
  }

  findOneById(id: number): Dog {
    return this.dogs.find(dog => dog.id === id);
  }
}
