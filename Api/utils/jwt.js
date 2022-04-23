var jwt = require('jsonwebtoken')

const getToken = async (user) =>
    await jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '30 days',
        }
    )

const getUserFromToken = async (token, db) => {
    if (!token) return null
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decodedToken.id) return null
    const user = await db.findById(decodedToken.id)
    return user
}

module.exports = {
    getToken,
    getUserFromToken,
}
