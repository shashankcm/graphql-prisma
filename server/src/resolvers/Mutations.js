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

module.exports = {
  signup,
  login
};
