import React, { useRef } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const ChatArea = () => {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        if(textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    };

    // const handleSendMessage = () => {
    //     if()
    // }

    return (
        <>
            <div className='flex justify-center'><Textarea className='w-1/2' /></div>
        </>
    )
}

export default ChatArea