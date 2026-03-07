import React, { useEffect, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize'; 
import { Plus, Mic, AudioLines, Send, SendHorizonal } from "lucide-react";
import { useAppDispatch } from "@/hooks/useRedux";
import { getAIResponse } from "@/features/ai/aiSlice";

const ChatArea = () => {
    const [prompt, setPrompt] = useState<string>(""); 
    const dispatch = useAppDispatch();
    

    const handleSendMessage = () => {
        if(!prompt.trim()) return 

        dispatch(getAIResponse({role: 'user', prompt}));

        setPrompt("");
    }
    

  return (
    <div className="flex min-w-1/2 max-w-1/2 justify-center items-center gap-2 bg-white border border-gray-300 rounded-[32px] pl-2 pr-2 py-2 shadow-sm focus-within:ring-1 focus-within:ring-gray-300 transition-all">
      
      <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full mb-1">
        <Plus className="w-6 h-6 stroke-[1.5]" />
      </button>

      <TextareaAutosize
        minRows={1}
        maxRows={6}
        placeholder="Hỏi bất kỳ điều gì"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-1 bg-transparent resize-none outline-none py-3 text-gray-800 placeholder-gray-500 text-base"
      />

      <div className="flex items-center gap-1 mb-1">
         <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
            <Mic className="w-5 h-5 stroke-[1.5]" />
         </button>
         
         <button onClick={handleSendMessage} className="p-3 bg-[#f0f4f9] text-black hover:bg-gray-200 rounded-full">
            <SendHorizonal className="w-5 h-5 stroke-[1.5]" />
         </button>
      </div>

    </div>
  )
}

export default ChatArea