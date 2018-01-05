import {
  Module,
  MiddlewaresConsumer,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {GraphQLModule, GraphQLFactory} from '@nestjs/graphql';

import {CatsModule} from './user/cats/cats.module';

@Module({
  imports: [
    CatsModule,
    //
    GraphQLModule
  ]
})
export class UserModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewaresConsumer) {
    const schema = this.createSchema();
    consumer
      .apply(graphiqlExpress({endpointURL: '/graphql'}))
      .forRoutes({path: '/graphiql', method: RequestMethod.GET})
      .apply(graphqlExpress(req => ({schema, rootValue: req})))
      .forRoutes({path: '/graphql', method: RequestMethod.ALL});
  }

  createSchema() {
    //
    const typePathsUser = './**/user/**/*.graphql';
    //
    const typeDefs = this.graphQLFactory.mergeTypesByPaths(typePathsUser);
    const schema = this.graphQLFactory.createSchema({typeDefs});
    return this.graphQLFactory.createSchema({typeDefs});
  }
}
