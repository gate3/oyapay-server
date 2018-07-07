class TwilioSms {
    //Simulated method to send sms using promise
    sendSms (phone, message) {
        return new Promise((resolve, reject)=>{
            resolve(`Sent ${message} to ${phone}`)
        }) 
    }
}

module.exports = new TwilioSms()