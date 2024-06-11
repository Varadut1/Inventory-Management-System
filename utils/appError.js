class AppError extends Error {  // inheritance
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);  // function call is not going to appear in stacktrace
    }
    transfer(res){
        res.status(this.statusCode).json({
            status: this.status,
            message: this.message
        })
    }
}



module.exports = AppError;