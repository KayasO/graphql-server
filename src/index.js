const { GraphQLServer } = require('graphql-yoga')

let links = [
  {
    id: 'link-0',
    url: 'www.facebook.com',
    description: 'Some website apparently made by Mark Zuckerberg',
  },
]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is some information about the API`,
    feed: (parent, args, context, info) => {
      return context.prisma.links()
    },
  },
  Mutation: {
    createLink: (parent, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url,
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
