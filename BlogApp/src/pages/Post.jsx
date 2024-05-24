import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components/index.js';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  let id = userData.$id !== undefined ? userData.$id : userData.userData.$id;
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // Logging to debug slug
  console.log('Extracted slug from URL:', slug);


  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate('/');
        }
      })
      }
     else {
      navigate('/');
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate('/');
      }
    })
  };

  return post ? (
    <div className="py-8 flex justify-center">
      <div className="max-w-[57rem]">
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl overflow-hidden">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="max-h-80 w-auto max-w-full h-auto object-contain mx-auto"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6 space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">
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
          <div className="browser-css text-left leading-relaxed">
            {parse(String(post.content))}
          </div>
        </Container>
      </div>
    </div>
  ) : null;
}
