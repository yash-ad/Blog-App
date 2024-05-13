import appwriteService from '../appwrite/conf';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Define a functional component named PostCard and pass props as parameters
function PostCard({ $id, title, featuredImage }) {
    return (
        // Wrap the card content in a Link component to make it clickable
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {/* Use the getFilePreview method from appwriteService to get the image preview */}
                    {/* Pass the featuredImage id to getFilePreview method */}
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
