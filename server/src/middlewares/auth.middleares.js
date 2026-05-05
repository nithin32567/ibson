
export const authMiddleware = (req, res, next) => {
    try {

        const token = req.headers.Authorization.split("")[1]
        console.log(token)
        next()
    } catch (error) {
        console.log(error)
        return
    }
}