const db_constants = require('../../helpers/db_constants.helper').adminSignup
const AdminDb = require('../../db/admin.db')
const ResponseHelper = require('../../helpers/response.helper')
const stringConstants = require('../../helpers/strings.helpers')

module.exports = {
    signUp:function(req, res, next) {
        const params = req.body
        
        // error checking 
        if(params[db_constants.businessName] 
            && params[db_constants.fullName] 
            && params[db_constants.password] 
            && params[db_constants.phone]){
            
            // using the helper constants to keep things dry and also making sure the code only has to change from the constants file in case there is any change in parameter name
            const adminData = {}
            adminData[db_constants.businessName] = params[db_constants.businessName]
            adminData[db_constants.fullName] = params[db_constants.fullName]
            adminData[db_constants.password] = params[db_constants.password]
            adminData[db_constants.phone] = params[db_constants.phone]
            
            AdminDb.create(adminData, function(err, admin){
                if(err){
                    return res.send(ResponseHelper.errorResponse(err))
                }else{
                    return res.send(ResponseHelper.successResponse(stringConstants.admin.createAdmin.saveSuccess))
                }
            })
        }else{
            return res.send(ResponseHelper.errorResponse(stringConstants.generic.paramterError))
        }
    }
}
