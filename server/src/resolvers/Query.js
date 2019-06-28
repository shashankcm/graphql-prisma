const feed = (root, args, context, info) => {
  return context.prisma.links();
};
const info = () => `This is an Hakernews API clone`;

module.exports = {
  feed,
  info
};
