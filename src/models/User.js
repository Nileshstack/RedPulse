const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
        required:true,
    },
   role: {
    type: String,
    required: true,
    enum: ["admin", "receiver", "donor"], 
},
},{timestamps:true})
export default mongoose.model("User",userSchema)