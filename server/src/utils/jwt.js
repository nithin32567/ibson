import jwt from 'jsonwebtoken'
const accessSecret = process.env.ACCESS_SECRET || "RANDOM SECRET"
const refreshSecret = process.env.REFRESH_SECRET || "RANDOM REFRESH SECRET"
export const generateAccessToken = (payload) => {
    const accessToken = jwt.sign(payload, accessSecret, {
        expiresIn: "15m"
    })
    return accessToken
}

export const generateRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, refreshSecret, {
        expiresIn: "30d"
    })
    return refreshToken
}


export const decodeAccessToken = async (token) => {
    const decoded = jwt.verify(token, accessSecret)
    return decoded
}
