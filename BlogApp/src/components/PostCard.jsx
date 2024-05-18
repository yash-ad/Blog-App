import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}> {/* Link to the post detail page */}
      <div className='w-full bg-gray-100 rounded-xl p-4'> {/* Card container */}
        <div className='w-full justify-center mb-4'> {/* Image container */}
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title} 
            className='rounded-xl' /> {/* Post image with alt text */}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2> {/* Post title */}
      </div>
    </Link>
  );
}

export default PostCard;
