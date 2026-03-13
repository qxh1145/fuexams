import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "../model/ChatHistory.js";
import { model } from "mongoose";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const { prompt, title, chatId } = req.body;

    const userId = req.user._id;
    console.log("hello: ", userId);

    if (!prompt) {
      return res.status(400).json({ message: "Please enter question" });
    }

    // let chatDoc = await ChatHistory.findOne({ userId: userId });

    // if (!chatDoc) {
    //   chatDoc = new ChatHistory({ userId: userId, message: [], title: title });
    // }
    // console.log("chatDoc: ", chatDoc);
    let chatDoc;

    if (chatId) {
      chatDoc = await ChatHistory.findOne({ _id: chatId, userId: userId });
      if (!chatDoc) return res.status(404).json({ message: "Chat not found" });
    } else {
      const newTitle =
        title ||
        (prompt.length > 30 ? prompt.substring(0, 30) + "..." : prompt);
      chatDoc = new ChatHistory({ userId: userId, message: [], title: newTitle });
    }

    const fomattedHistory = chatDoc.message.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.message }],
    }));

    const systemInstruction = `
            Bạn là một Mentor chuyên về Công nghệ thông tin (IT) và Truyền thông đa phương tiện.

Nhiệm vụ: Trả lời các câu hỏi trắc nghiệm do người dùng cung cấp.

Với mỗi câu hỏi, hãy trả lời theo đúng cấu trúc:
1. Đáp án đúng: <A/B/C/D...>
2. Giải thích: Giải thích rõ ràng vì sao đáp án này đúng.
3. Các đáp án sai: Giải thích ngắn gọn vì sao từng đáp án còn lại sai.

Quy tắc:
- Chỉ trả lời các câu hỏi liên quan đến IT hoặc Truyền thông đa phương tiện.
- Nếu câu hỏi ngoài lĩnh vực này, hãy từ chối lịch sự và yêu cầu người dùng hỏi đúng chuyên môn.
- Trả lời ngắn gọn, rõ ràng, tập trung vào kiến thức chuyên môn.
        `;
    const aiModel = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL,
      systemInstruction: systemInstruction,
    });

    const chatSession = aiModel.startChat({
      history: fomattedHistory,
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    chatDoc.message.push({ role: "user", message: prompt });
    chatDoc.message.push({ role: "model", message: responseText });

    await chatDoc.save();
    return res.status(200).json({ reply: responseText, chatId: chatDoc._id });
  } catch (error) {
    console.error("Error while calling Geminni API: ", error);
    return res.status(500).json({ message: "Error while calling gemini API" });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const  userId  = req.user._id;
    const allChatHistory = await ChatHistory.find({ userId: userId }).sort({updatedAt: -1});
    return res.status(200).json(allChatHistory);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
export const getChatByChatId = async (req, res) => {
  try {
    const { chatid } = req.params;
    const conversation = await ChatHistory.findOne({
      _id: chatid,
    });

    return res.status(200).json(conversation)
  } catch (error) {
    return res.status(500).json({ error });
  }
};
