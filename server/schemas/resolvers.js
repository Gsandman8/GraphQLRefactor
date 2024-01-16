const { User } = require('../models');

const resolvers = {

    Query: {
        me: async (parent, args) => {
            return User.findOne({ _id: args._id });
        },
        books: async (parent, args) => {
            return User.find({ bookId: args.bookId });
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
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

            return user;
        },
    }
}

