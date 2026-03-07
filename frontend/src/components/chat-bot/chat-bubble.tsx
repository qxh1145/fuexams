import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

const ChatBubble = ({ reply, role }: { reply: string | null, role: string }) => {
  const { currentUser } = useAppSelector((state) => state.auth)
  const { isLoading } = useAppSelector((state) => state.ai)
  return (

    <div className={`flex gap-2 ${role === 'user' ? `pr-30` : `pl-30`}`}>
      {role === 'model' && <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="grayscale"
        />
      </Avatar>}
      {reply == "load" ? <div className={`border w-fit max-w-120 rounded-3xl p-3  ${role === 'user' ? `text-right bg-gray-300` : `text-left bg-blue-400`} `}>
        <div className="flex items-center gap-1 p-3">
          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" />
        </div>
      </div> : <div className={`border w-fit max-w-120 rounded-3xl p-3  ${role === 'user' ? `text-right bg-gray-300` : `text-left bg-blue-400`} `}>
        {reply}
      </div>}

      {role === 'user' && <Avatar>
        <AvatarImage
          alt={currentUser?.username}
          className="grayscale"
        />
        <AvatarFallback className='rounded-2xl'>{currentUser?.username.slice(0, 1)}</AvatarFallback>
      </Avatar>}
    </div>
  )


}

export default ChatBubble