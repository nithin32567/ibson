
import bcrypt from 'bcrypt'
export const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
    if (!password || !hashedPassword) {
        throw new Error("Missing password or hash");
    }

    return await bcrypt.compare(password, hashedPassword);
};
