const bcrypt = require('bcryptjs')
const { getToken } = require('../../utils/getToken')

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
        return { token: getToken(user), user }
    },
    signIn: async (_, { input }, { db: { User } }) => {
        const { password, email } = input
        try {
            const user = await User.findOne({ email })
            if (!user) {
                throw new Error('invalid credentials ')
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                throw new Error('invalid credentials ')
            }
            return { token: getToken(user), user }
        } catch (error) {
            throw new Error(error)
        }
    },
}
