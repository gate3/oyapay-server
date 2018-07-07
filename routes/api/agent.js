const db_constants = require('../../helpers/db_constants.helper').agentSignup
const AgentDb = require('../../db/agent.db')
const ResponseHelper = require('../../helpers/response.helper')
const stringConstants = require('../../helpers/strings.helpers')
const smsHelper = require('../../helpers/sms/sms_helper.helper')

module.exports = {
    signUp: function(req, res, next) {
        const params = req.body

        // error checking if all parameters have been passed
        if(params[db_constants.name] && params[db_constants.phone]){
            const agentData = {}
            agentData[db_constants.name] = params[db_constants.name]
            agentData[db_constants.phone] = params[db_constants.phone]

            AgentDb.create(agentData, async function(err, agent){
                if(err){
                    return res.send(ResponseHelper.errorResponse(err))
                }else{
                    try{
                        const smsResult = await smsHelper.sendSms(agent, 'Account created')
                        //result of the sms sent
                        console.log(smsResult)
                        return res.send(ResponseHelper.successResponse(stringConstants.agent.createAgent.saveSuccess))
                    }catch(e){
                        //log the error since the account has been created but the sms wasn't sent, this will be taken care of by the team.
                    }
                }
            })
        }else{
            return res.send(ResponseHelper.errorResponse(stringConstants.generic.paramterError))
        }
    }
}
