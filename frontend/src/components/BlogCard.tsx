import { Link } from "react-router-dom"


interface BlogCardProps {
    id: number,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
}



export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate

}: BlogCardProps) => {

    return <Link to={'/blog/${id}'}>
     <div className="p-4 flex cursor-pointer justify-center flex-col border-b border-slate-300 pb-4 min-w-md ">
        <div className="flex mt-5  cursor-pointer">
            <div className="flex justify-center flex-col cursor-pointer">
                <Avatar name={authorName}/> 
            </div>

            <div className="font-small pl-2 cursor-pointer">{authorName}</div> 
           
           <div className="flex justify-center flex-col pl-2">
                <Circle/>
           </div>

            <div className="pl-2 font-thin text-slate-400  flex justify-center flex-col">
                {publishedDate}
            </div>
            
        </div>    
            <div className=" text-xl font-bold cursor-pointer mt-4">


                <p className="text-lg  group relative w-max">
                <span>{title}</span>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-full"></span>
                </p>
                
                
            </div>

            <div className=" text-sm font-extralight mt-1">
                { content.length > 100 ? content.slice(0,100) + "..." : content}
            </div>

            <div className="pt-6 text-slate-400 text-xs font-extralight">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>


        </div>
    </Link>
}


function Circle(){
    return <div className=" h-1 w-1 rounded-full flex-col justify-center bg-slate-400 ">
        
    </div>
}

export function Avatar ({name, size = "small"}: {name: string , size?: "small" | "big"})  {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  ${size=== "small" ? "w-6 h-6": "w-10 h-10" }`}>
        <span className={ ` ${size === "small" ? "text-xs" : "text-md" } 
            font-extralight text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
    
}