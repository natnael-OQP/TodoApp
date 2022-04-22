var jwt = require('jsonwebtoken')

exports.getToken = async (user) =>
    await jwt.sign(
        {
            name: user.name,
            email: user.email,
            password: user.password,
            id: user.id,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '30 days',
        }
    )
