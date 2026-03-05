import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["user", "model"],
            require: true
        },
        message: {
            type: String,
            require: true,

        }
    }, {_id: false}
)

const chatHistorySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            require: true,
            unique: true
        },
        message: [messageSchema]
    }, {timestamps: true}
)
const ChatHistory = mongoose.model("chat-history", chatHistorySchema);
export default ChatHistory; 