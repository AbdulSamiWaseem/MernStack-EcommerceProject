const { validationErrorHandler } = require("../utils/utils")
const { duplicationErrorHandler } = require("../utils/utils")

const errorHandler = (error, req, res, next) => {
    console.log('errrrr',JSON.stringify(error,null,2))
    res.status(res.statusCode == 200 ? 500 : res.statusCode)
    if(error.code === 11000)
        duplicationErrorHandler(error,res)
    else if(error.name === 'ValidationError')
        validationErrorHandler(error,res)
    res.json({
        message: error?.message,
        stack: error
    })
}

const notFound = (req,res) => {
    res.status(404)
    res.json({
        message:'Route not found'
    })
}

module.exports = {
    errorHandler,
    notFound
}