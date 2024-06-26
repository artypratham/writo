import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/skeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {

    const {loading,blogs} = useBlogs();

    if(loading){
        return <div>
            <AppBar/>

           <div className="flex justify-center flex-col">
                <div>
                        <Skeleton/>
                    </div>

                    <div>
                        <Skeleton/>
                    </div>


                    <div>
                        <Skeleton/> 
                    </div>


                    <div>
                        <Skeleton/>
                    </div>
           </div>

            
        </div>
    }
    return <div>
            <AppBar/>

            <div className="flex justify-center">  
                <div className=" ">

                {blogs.map(blog =>  <BlogCard 
                    id={blog.id}
                    authorName={blog.author.name || ""} 
                    title={blog.title}
                    content={blog.content} 
                    publishedDate={"24th June 2024"} 
                    
                    />
                
                )}
            
                 </div>


            </div> 

    </div>
    
}