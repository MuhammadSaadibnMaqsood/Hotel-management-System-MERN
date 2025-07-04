import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ['user', 'hotelowner'], default: 'user' },
    recentSearchCities: { type: String, required: true, default: [] },

}, { timestamps: true });

const User = mongoose.model('Users', userSchema);

export default User