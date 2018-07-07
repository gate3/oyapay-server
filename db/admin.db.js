const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const adminCollection = require('../helpers/db_constants.helper').collections.Admin
// define the admin table schema and the constraints
const schema = {
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    businessName:{
        type:String,
        required:true,
        trim:true,
        unqiue:true
    },
    password:{
        type:String,
        required:true
    }
}

const AdminSchema = new mongoose.Schema(schema)

// use the pre-save hook to encrypt the password
AdminSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password,10,function(err, hash){
        if(err){
            return next(err)
        }
        user.password = hash
        next()
    })
})

const Admin = mongoose.model(adminCollection, AdminSchema)
module.exports = Admin