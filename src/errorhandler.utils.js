export const htmlError = (code,message = "no error message") => {
    return {
        code: code,
        message: message
    }
}
