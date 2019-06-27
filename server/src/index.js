const { GraphQLServer } = require("graphql-yoga");

const { prisma } = require("./generated/prisma-client");

/* async function main() {
  // Create a new link
  const newLink = await prisma.createLink({
    url: "www.prisma.io",
    description: "Prisma replaces traditional ORMs"
  });
  console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

  // Read all links from the database and print them to the console
  const allLinks = await prisma.links();
  console.log(allLinks);
}

main().catch(e => console.error(e)); */

const resolvers = {
  Query: {
    info: () => `This is an Hakernews API clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    },
    link: (root, { id }, context, info) => {
      return links.find(u => u.id === id);
    }
  },
  Mutation: {
    post: (roor, args, context) => {
      return context.prisma.createLink({
        description: args.description,
        url: args.url
      });
    }
  }
};
const server = new GraphQLServer({
  typeDefs: "./src/schema/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log("Servering Started in port ===>>>>>>>> 40000 "));
