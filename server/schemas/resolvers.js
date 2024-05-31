const {User} = require('../models');
const { signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id});
      }
      throw AuthenticationError;
    }
  },

  Mutation: {
    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return {token, user};
    },
    addUser: async (parent, {username, email, password }) => {
      const user = await User.create({ username, email, password});
      const token = signToken(user);
      return {token, user};
    },
    savedBooks: async (parent, {bookId, authors, description, title, image, link}, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    }
  }
}