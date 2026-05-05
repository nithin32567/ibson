import jwt from 'jsonwebtoken'
const accessSecret = process.env.ACCESS_SECRET || "RANDOM SECRET"
const refreshSecret = process.env.REFRESH_SECRET
export const generateAccessToken = async (userid) => {
    const accessToken = jwt.sign(userid, accessSecret, {
        expiresIn: "15m"
    })
    return accessToken
}

export const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign(userId, refreshSecret, {
        expiresIn: "30d"
    })
    return refreshToken
}