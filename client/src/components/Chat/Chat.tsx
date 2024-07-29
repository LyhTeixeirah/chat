import { useRef, useState, useEffect } from "react";
import Card from "../Card";


export default function Chat({socket}){
 
const messageRef = useRef(null)

//List
const [messageList, setMessageList] = useState([])

useEffect(() => {
    socket.on('reveived', data => {
        setMessageList((current) => [...current, data])
    })
    return()=> socket.off('received')
}, [socket])
  
//Set Input message
const handleMessageInput = () => {
    const message = messageRef.current.value
        if(!message.trim()) return
       //console.log(message)
       socket.emit('message', message)
       clearInput()
    }

    const clearInput = () => {
        messageRef.current.value = ''
    }

    const enterSend = (e) => {
        if(e.key === 'Enter')
            handleMessageInput()
    }

    return (
        <div className="bg-purple-700 w-full h-full flex-col">
            <div className="scroll-smooth focus:scroll-auto overflow-auto bg-slate-600 w-1/3 h-full rounded-sm bottom-0 items-center flex-col space-y-2 p-12">
                {
                    messageList.map((message, index) => (
                        <Card key={index} 
                            nickname={message.nickname} 
                            message={message.message} 
                            hour={message.createdAt}/>
                    ))
                }
            </div>
            <div className="w-1/3">
                <div className="w-full flex p-4">
                    <input ref={messageRef} 
                    className=" rounded appearance-none border w-full text-gray-700 mr-3 py-1 px-2 
                        leading-tight focus:outline-none" type="text" 
                        placeholder="Type to your message" id="callData" aria-label="Full name"
                        onKeyDown={(e) => enterSend(e)}
                    />
                    <button className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-sm border-none text-white py-1 px-2 rounded" 
                        type="submit" onClick={()=>handleMessageInput()}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}



