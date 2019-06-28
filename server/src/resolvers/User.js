const links = (parent, args, context, infor) => {
  return context.prisma.user({ id: parent.id }).links();
};
module.exports = {
  links
};
