const { GraphQLServer } = require("graphql-yoga");

const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutations");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");
const Subscription = require("./resolvers/Subscription");

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
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
  /* Query: {
    link: (root, { id }, context, info) => {
      return links.find(u => u.id === id);
    }
  } */
};
const server = new GraphQLServer({
  typeDefs: "./src/schema/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(() => console.log("Servering Started in port ===>>>>>>>> 40000 "));
