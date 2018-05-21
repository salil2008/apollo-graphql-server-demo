import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { ApolloEngine } from 'apollo-engine';
import bodyParser from 'body-parser';
import compression from 'compression';
import schema from './data/schema';

const GRAPHQL_PORT = 3000;
const ENGINE_API_KEY = 'service:salil2008-8580:l-eQ-jDFCCIfqb5K0Uf_Sg';

const graphQLServer = express();

const engine = new ApolloEngine({
  apiKey: ENGINE_API_KEY,
  stores: [
      {
        name: 'inMemEmbeddedCache',
        inMemory: {
          cacheSize: 20971520 // 20 MB
        }
      }
    ],
    queryCache: {
      publicFullQueryStore: 'inMemEmbeddedCache'
    }
});

graphQLServer.use(compression());

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema, tracing: true, cacheControl: true }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

engine.listen({
  port: GRAPHQL_PORT,
  expressApp: graphQLServer,
});
