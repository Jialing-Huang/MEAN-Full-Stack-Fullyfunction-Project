const mongoose = require("mongoose");
//Import mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

//Create schema for user
const userSchema = mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
});

//Attach unique attribute to the userSchema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema);