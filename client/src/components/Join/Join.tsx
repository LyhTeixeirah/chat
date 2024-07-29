import { useRef } from "react";
import { io } from "socket.io-client";

export default function Join({setChatVisibility, setSocket}){

   const useNickname = useRef(null)

   const handleNicknameInput = async (event: any ) => {
     
    //Set username
      const nickname = useNickname.current.value 
      if(!nickname.trim()) return
      
      const socket = await io.connect('http://localhost:3000')
      socket.emit('set_nickname', nickname)
      setSocket(socket)
      setChatVisibility(true)

        //clear input
        useNickname.current.value = ''
    }

    //Send with enter
    const enterSend = (e) => {
        if(e.key === 'Enter')
            handleMessageInput()
    }

    return (
        <div className="w-full text-center">
            <h1 className="text-white">Join</h1>
            <input ref={useNickname} className="h-8 appearance-none rounded w-1/2 text-gray-700 mr-3 py-1 px-2 
                leading-tight focus:outline-none" type="text" 
                placeholder="type to you nickname" id="callData" aria-label="Full name"
                onKeyDown={(e) => enterSend(e)}
            />
            <button className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-sm border-none text-white py-1 px-2 rounded" 
                type="submit" onClick={handleNicknameInput}> Sing In
            </button>
        </div>
    )
}