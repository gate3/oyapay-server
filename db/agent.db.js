const mongoose = require('mongoose');
const agentCollection = require('../helpers/db_constants.helper').collections.Agent

// define the merchant table schema and the constraints
const schema = {
    name:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
}
// initialize a new schema 
const AgentSchema = new mongoose.Schema(schema)
// create a model using the schema
const Agent = mongoose.model(agentCollection, AgentSchema)
module.exports = Agent