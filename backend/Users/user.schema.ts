const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    walletAddress: {
        type: String,
    },
    password: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

export const UserSchema = mongoose.model("User", userSchema);
