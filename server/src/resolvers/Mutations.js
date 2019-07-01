const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { APP_SECRET, getUserId } = require("../utils.js");

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error(
      "User email is invalid, please try login with correct user details. "
    );
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error(
      "Invalid password, please try login with correct password details. "
    );
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
};

const post = (parent, args, context, info) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    description: args.description,
    url: args.description,
    postedBy: { connect: { id: userId } }
  });
};

const vote = async (parent, args, context, info) => {
  const userId = getUserId(context);
  const linkExists = await context.prisma.$exists.vote({
    link: { id: args.linkId },
    user: { id: userId }
  });
  if (linkExists) {
    throw new Error(`Voted is aleady exist for this link :${args.linkId}`);
  }
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } }
  });
};

module.exports = {
  signup,
  login,
  post,
  vote
};
