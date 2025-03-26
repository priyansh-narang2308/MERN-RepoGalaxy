import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ""
    },
    profileUrl: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
    },
    // intilaly the likeed will be zero
    likedProfiles: {
        type: [String],
        default: []
    },
    likedBy: [
        {
            username: {
                type: String,
                required: true,
            },
            avatarUrl: {
                type: String,
            },

            likedDate: {
                type: Date,
                default: Date.now
            }
        }
    ]

},
    {
        timestamps: true,
    });

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;