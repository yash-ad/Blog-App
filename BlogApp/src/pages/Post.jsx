import { useState ,useEffect} from "react"
import appWriteService from '../appwrite/conf';
import {useNavigate,useParams,Link} from 'react-router-dom';
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux"

function Post() {
    const [post,setPost] = useState([]);

    const navigate = useNavigate();

    const {slug} = useParams();

    const userData = useSelector((state)=> state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$Id : false ;

    useEffect(()=>{
if(slug){
    appWriteService.getPost(slug).then((post)=>{
if(post){
    setPost(post)
}
else{
    navigate('/')
}
    })
}
else{
    navigate('/')
}
    },[slug,navigate]);

    const deletePost = ()=>{
        appWriteService.deletePost(post.$Id).then((status)=>{
if(status){
    appWriteService.deleteFile(post.featuredImage);
    navigate("/");
}
        })
    }

  return post ? (
    <div className="py-8">
    <Container>
    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
            src={appWriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
        />

        { isAuthor && (
                <div className="absolute right-6 top-6">
                    <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                </div>
            )}
    </div>
    <div className="w-full mb-6">
    <h1 className="text-2xl font-bold">{post.title}</h1>
    </div>
    <div className="browser-css">
                    {parse(post.content)}
                    </div>
    </Container>
    </div>
  ) : null
}

export default Post