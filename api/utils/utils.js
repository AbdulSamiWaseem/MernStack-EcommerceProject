const capitalizeFirstLetter = (string) => {
    return `${string[0].toUpperCase()}${string.slice(1)}`
}
const duplicationErrorHandler = (error,res) => {
    const fieldName = Object.keys(error.keyValue)[0]
    res.status(400).json({
        message:`${capitalizeFirstLetter(fieldName)} already exists`
    })
}

const validationErrorHandler = (error,res) => {
    const message = Object.values(error.errors)[0].message
    res.status(400).json({
        message
    })
}

module.exports = {
    capitalizeFirstLetter,
    duplicationErrorHandler,
    validationErrorHandler
}