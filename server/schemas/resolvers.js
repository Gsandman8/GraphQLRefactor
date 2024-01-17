const { User, Book } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .populate('books')

                return userData;
            }
            throw AuthenticationError;
        },
        books: async (parent, args) => {
            return User.find({ bookId: args.bookId });
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('Incorrect Username or Password');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Username or Password');
            }

            const token = signToken(user);
            return { token, user };

        },
        saveBook: async (parent, { authors, description, bookId, image, link, title }, context) => {
            if (context.user) {
                const book = await Book.create({ authors, description, bookId, image, link, title });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { books: book } },
                    { new: true }
                );

                return User;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const book = await Book.findOneAndDelete({
                    _id: bookId,
                    username: context.user.username,
                });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { books: bookId } },
                    { new: true }
                );

                return User;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
}

module.exports = resolvers;

