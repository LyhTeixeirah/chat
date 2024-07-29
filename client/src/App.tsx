
import { useState } from 'react'
import './App.css'
import Chat from './components/Chat/Chat'
import Join from './components/Join/Join'


function App() {

  const [isChatVisibility, setIsChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)
  

  return (
    <div className='bg-zinc-900 w-full h-[700px] flex-col space-y-40 align-center rounded-md'>
    {
      isChatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setIsChatVisibility} />
    }
     
    </div>
  )
}

export default App
