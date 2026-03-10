import SidebarLayout from "@/pages/Sidebar";
import ChatHistory from '@/components/chat-bot/chat-history';
import ChatArea from '@/components/chat-bot/chat-area';
import ChatBubble from '@/components/chat-bot/chat-bubble';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import TextType from "@/components/TextType";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router";
import { clearCurrentChat, getChatHistoryById } from "@/features/ai/aiSlice";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

const FueAi = () => {
  const { chatHistory, isLoading, chatLoading } = useAppSelector((state) => state.ai);
  const { chatid } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chatid) {
      dispatch(getChatHistoryById(chatid));
    } else {
      dispatch(clearCurrentChat())
    }
  }, [chatid, dispatch])

  return (
    <SidebarLayout sidebar={<ChatHistory />}>
      <div className='flex flex-col relative overflow-hidden bg-background h-[calc(100vh-73px)]'>
        <ScrollArea className="flex-1 p-4 pb-24 h-full">



          {chatHistory && chatHistory.length > 0 ?
            <div className="flex flex-col gap-4">
              {chatHistory.map((msg: any, index: number) => (
                <div key={index} className={`flex ${msg.role === "user" ? 'justify-end' : 'justify-start'}`}>
                  <ChatBubble role={msg.role} reply={msg.prompt} />
                </div>
              ))}

              {isLoading && <ChatBubble role={'model'} reply={"load"} />}
            </div> :

            <div className="text-center space-y-4 pb-10 flex justify-center min-h-[calc(100vh-250px)] items-center">
              {chatLoading ? <div><Spinner className="text-gray-400" /></div> :

                <TextType
                  typingSpeed={80}
                  pauseDuration={500000}
                  showCursor
                  cursorCharacter="_"
                  text={["Welcome to FUE AI! Good to see you!", "Build some amazing experiences!"]}
                  deletingSpeed={50}
                  variableSpeedEnabled={false}
                  variableSpeedMin={60}
                  variableSpeedMax={120}
                  cursorBlinkDuration={0.4}
                  className="text-2xl font-mono"
                />
              }

            </div>}


        </ScrollArea>

        <div className='absolute bottom-0 left-0 right-0 p-4 bg-background flex justify-center shrink-0 z-10'>
          <ChatArea />
        </div>
      </div>
    </SidebarLayout>
  )
}

export default FueAi