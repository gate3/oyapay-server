// Do no depend directly on concrete classes, depend on abstractions because concrete classes can change especially external api's
const twilio = require('./twilio_sms')

class SmsHelper {
    constructor () {
        this.smsHelper = twilio
    }
    /**
     * 
     * @param {Object<agent>} agentObject - The entire agent object, we are using composition here.
     * @param {String} message - The message to send
     * 
     * method to send the message. Using the simulated twilio class this way makes this pattern work  like factory pattern because we can perform any other operation in this method before using the twilio service to send message 
     */
    sendSms (agentObject, message) {
        return this.smsHelper.sendSms(agentObject.phone, message)
    }
}

module.exports = new SmsHelper()