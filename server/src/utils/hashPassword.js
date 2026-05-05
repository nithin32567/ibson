
import bcrypt from 'bcrypt'
export const hashPassword = async (password) => {

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

export const verifyPassword = (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword)
}

