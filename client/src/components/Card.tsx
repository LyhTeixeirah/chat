interface ICardMessage{
nickname: string,
message: string
hour: string
}

export default function Card({nickname,hour, message}: ICardMessage ){
    return(
        <div className=" border-collapse">
            <div className= "  flex items-center rounded-md  bg-slate-800 max-w-64 justify-between p-4 gap-4 h-auto w-auto">
                <div className="text-sm h-auto">
                <p className=" text-purple-500 w-[150px] overflow-clip inline-flex">{message}</p> 
            </div>
            <div>
                <h3 className=" font-sans text-purple-600 text-">
                {nickname}
                </h3> 
                <p className="block font-sans text-[10px] font-light leading-normal text-white/40 antialiased">
                {hour}
                </p>
            </div>
        </div>
    </div>
    )
}