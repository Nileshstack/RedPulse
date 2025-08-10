import mongoose, { Schema } from "mongoose";

const bloodSchema= new Schema({
    bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  quantity: {
    type: String, 
    required: true,
    default: 0,
  },
  collectedDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    default: function () {
      const collected = this.collectedDate || new Date();
      return new Date(collected.getTime() + 42 * 24 * 60 * 60 * 1000);
    },
  },
  status: {
    type: String,
    enum: ['Later today', 'Sometime soon', 'When needed'],
    default: 'Later today',
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
},{timestamps:true})
export default mongoose.model("Blood",bloodSchema)
