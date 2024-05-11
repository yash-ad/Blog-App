import { useState,useEffect } from "react"
import appWriteService from '../appwrite/conf'
import {Container,PostForm} from '../components'
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {

    //State variables
    const[post,setPost] = useState(null);

    //To get values from URL:-
    const{slug} = useParams();

    //For navigation:-
    const navigate = useNavigate();

    //useEffect() hook for slug values 
    useEffect(()=>{
if(slug){
    appWriteService.getPost(slug).then((post)=>{
setPost(post)
    })
}
else{
    //navigate to the user 
    navigate('/');
}
    },[slug,navigate])

    //Conditionally renders if there is a post then do something else or do nothing
  return post ? (
<div className='py-8'>
<Container>
    <PostForm data={post}/>
</Container>
</div>
  ) : null
}

export default EditPost