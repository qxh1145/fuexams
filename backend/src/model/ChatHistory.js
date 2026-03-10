import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["user", "model"],
            required: true
        },
        message: {
            type: String,
            required: true,

        }
    }, {_id: false}
)

const chatHistorySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            require: true,
        },
        title: {
            type: String,
            required: true
        },
        message: [messageSchema]
    }, {timestamps: true}
)
const ChatHistory = mongoose.model("chat-history", chatHistorySchema);
export default ChatHistory; 