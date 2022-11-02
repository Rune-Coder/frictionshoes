import mongoose from "mongoose";

const userHistorySchema = mongoose.Schema({

    email:{
        type: String,
        required: true,
        unique: true
    },
    cart:{
        type: Array,
        required: true,
        default: []
    },
    bill:{
        type: Array,
        required: true,
        default: []
    },
    wish:{
        type: Array,
        required: true,
        default: []
    },
    address:{
        type: Array,
        required: true,
        default: []
    },
    orders:{
        type: Array,
        required: true,
        default: []
    }

});

const UserHistory = mongoose.model("UserHistory", userHistorySchema);

export default UserHistory;