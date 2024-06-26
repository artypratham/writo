import { useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { Skeleton } from "../components/skeleton";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";


export const Blog = () => {
  const {id} = useParams();
  const {loading, blog} = useBlog({
    id: id || ""
  });
  if(loading || !blog){
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

       </div>

        
    </div>
}return <div>

     
        <FullBlog blog={blog}/>
      

    </div>
  
};