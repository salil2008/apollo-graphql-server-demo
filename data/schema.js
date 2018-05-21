import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Query {
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String @cacheControl(maxAge: 5)
}
type Author {
	id: Int
	firstName: String
	lastName: String
	posts: [Post]
}
type Post {
	id: Int
	title: String 
	text: String
	views: Int
	author: Author
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
