import appwriteService from '../appwrite/config'; // Importing the appwriteService from its configuration file
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom

// Defining the PostCard component
function PostCard({ $id, title, featuredImage }) {
  return (
    <>
      <Link to={`/post/${$id}`}> {/* Creating a Link to the individual post using the $id */}
        {/* Rendering a div with card styling */}
        <div className='flex flex-col items-center text-center card-hover rounded-xl p-4 h-auto shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          {/* Rendering the featured image */}
          <div className="w-full mb-4">
            <img
              src={appwriteService.seeFilePreview(featuredImage)} // Getting the preview of the featured image
              alt={title} // Setting the alt attribute of the image to the post title
              className="rounded-xl w-full h-auto object-cover" // Applying styling to the image
            />
          </div>
          {/* Rendering the post title */}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default PostCard; // Exporting the PostCard component as the default export
