import { useState,useEffect } from 'react';
import appWriteService from '../appwrite/conf';
import {Container,PostCard} from '../components';

function AllPosts() {
    //Lets create state variables first:-
    //Because there is a query in an array into the appWrite conf getPosts()
    const [posts,setPosts] = useState([])

    //When the component loads the useEffect will run or render.
    useEffect(()=>{
appWriteService.getPosts([]).then((posts)=>{
if(posts){
    setPosts(posts.documents)
}
})
    },[])

  return (
    <div className='w-full py-8'>
<Container>
<div className='flex flex-wrap'>
{posts.map((post)=>(
<div key={post.$id} className='p-2 w-1/4'>
<PostCard data={post}/>
</div>
))}
</div>
</Container>
    </div>
  )
}

export default AllPosts