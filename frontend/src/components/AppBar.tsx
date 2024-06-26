import { Avatar } from "./BlogCard"

export const AppBar =()=>{
    return <div className="flex justify-center 
                           flex-col sticky top-0 z-10">    
        <div className="border-b
            flex justify-between px-10 py-5 bg-slate-100">

        <div className="text-2xl font-bold  ">
            
                <button className="relative inline-block font-medium group py-1.5 px-2.5 ">
                <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-slate-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border border-black group-hover:bg-indigo-50"></span>
                <span className="relative text-black ">Writo</span>
                </button>


        </div>

        <div className="flex justify-center flex-col">
            <Avatar size={"big"} name="Prathamesh"/>
        </div>

    </div>

    </div>
}