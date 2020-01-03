import { ApolloServer } from 'apollo-server-micro'
import neo4j from 'neo4j-driver'
import { schema } from '../../apollo/schema'
import dotenv from 'dotenv'

// set environment variables from ../.env
dotenv.config();

/*
 * Create a Neo4j driver instance to connect to the database
 * using credentials specified as environment variables
 * with fallback to defaults
 */
const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "neo4j"
  )
);

/*
 * Create a new ApolloServer instance, serving the GraphQL schema
 * created using makeAugmentedSchema above and injecting the Neo4j driver
 * instance into the context object so it is available in the
 * generated resolvers to connect to the database.
 */
const server = new ApolloServer({
  context: { driver },
  schema: schema,
  introspection: true,
  playground: true,
})

// Next.js API Routes reference: https://github.com/zeit/next.js#api-routes
export const config = {
  api: {
    // Body parsing is enabled by default with a size limit of 1mb for the parsed body. 
    // You can opt-out of automatic body parsing if you need to consume it as a Stream.
    bodyParser: false
  }
}

export default server.createHandler({
  path: '/api/graphql'
})