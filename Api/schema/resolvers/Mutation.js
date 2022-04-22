const bcrypt = require('bcryptjs')

exports.Mutation = {
    signUp: async (_, { input }, { db }) => {
        const { User } = db
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(input.password, salt)

        const newUser = {
            ...input,
            password: hashPassword,
        }
        const user = await User.create(newUser)
        return { token: hashPassword, user }
    },
    signIn: (parent, { input }, { db }) => {
        console.log(args)
        return []
    },
}
