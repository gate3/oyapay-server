module.exports = {
    //handle error logging here by using any error logging service like sentry
    errorResponse:(message) => {
        const {code} = message
        /**
             * We can use mongodb error codes which can be found here 
             * https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.err
             * To determine the exact error to return to the client, but for now  I'm using just one (Duplicate data error)
        */
        if(code != null && code === 11000){
            return {status:false, message:'Your phone number already exists. If you already have an account please login.'}
        }else{
            return {status:false, message}
        }
    },
    // handle success response
    successResponse:(message) => {
        return {status:true, message}
    }
}