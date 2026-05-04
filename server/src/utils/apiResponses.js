export const sendSuccess = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({ success: true, message, data })

}

export const sendError = (res, statuCode, message, error = null) => {
    return res.status(statuCode).json({ success: false, message, error })
}