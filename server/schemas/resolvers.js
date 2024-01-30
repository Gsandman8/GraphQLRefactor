const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  
  Query: {
    me: async (_root, { user = null }, context) => {
      const foundUser = await User.findOne({
        _id: context.user._id
      });

      if (!foundUser) {
        throw new Error('Cannot find a user with this id!');
      }

      return foundUser;
    },
  },

  Mutation: {
    addUser: async (_root, {username, email, password}) => {
        const user_name = `"${username}"`;
        const email_address = `"${email}"`;
        const pass_word = `"${password}"`;
      const user = await User.create({ user_name, email_address, pass_word});

      if(!user){
        throw new Error('Something is wrong!');
      }

      const token = signToken(user);
      return { token, user };
    },

    login: async (_root, {email, password}) => {
      const user = await User.findOne({ email });
      if(!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw){
        throw new Error('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_root, { authors, description, title, bookId, image, link },{ user }) => {
      try{
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: { authors, description, title, bookId, image, link } } },
          { new: true, runValidators: true }
        );
        return updatedUser
      } catch (err){
        console.log(err);
        throw new Error(err.message);
      }
    },

    removeBook: async (_root, { bookId }, { user }) => {
      const updatedUser = await User.findOneAndUpdate(
        {_id: user._id},
        { $pull: { savedBooks: { bookId } } },
        {new: true}
      );

      if(!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;