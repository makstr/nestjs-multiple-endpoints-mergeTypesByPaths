import {
  Module,
  MiddlewaresConsumer,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {GraphQLModule, GraphQLFactory} from '@nestjs/graphql';

import {CatsModule} from './user/cats/cats.module';
import {DogsModule} from './admin/dogs/dogs.module';

@Module({
  imports: [
    CatsModule,
    DogsModule,
    //
    GraphQLModule
  ]
})
export class AdminModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewaresConsumer) {
    const schema = this.createSchema();
    consumer
      .apply(graphiqlExpress({endpointURL: '/graphqladmin'}))
      .forRoutes({path: '/graphiqladmin', method: RequestMethod.GET})
      .apply(graphqlExpress(req => ({schema, rootValue: req})))
      .forRoutes({path: '/graphqladmin', method: RequestMethod.ALL});
  }

  createSchema() {
    // 
    const typePathsAdmin = './**/*.graphql';
    // 
    const typeDefs = this.graphQLFactory.mergeTypesByPaths(typePathsAdmin);
    const schema = this.graphQLFactory.createSchema({typeDefs});
    return this.graphQLFactory.createSchema({typeDefs});
  }
}
