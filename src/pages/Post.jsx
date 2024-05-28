import { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { Link, useNavigate, useParams } from 'react-router-dom'; // Importing Link, useNavigate, and useParams from react-router-dom
import appwriteService from '../appwrite/config'; // Importing appwriteService from its respective path
import { Button, Container } from '../components/index.js'; // Importing Button and Container components from their respective paths
import parse from 'html-react-parser'; // Importing the parse function from the 'html-react-parser' library
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux

export default function Post() {
  const [post, setPost] = useState(null); // State variable to store the post data
  const { slug } = useParams(); // Extracting the slug parameter from the URL
  const navigate = useNavigate(); // Initializing the useNavigate hook for navigation
  const {userData} = useSelector((state) => state.auth); // Fetching user data from Redux store

  // Logging to debug userData structure
  console.log('User Data:', userData);

  // Extracting user ID from user data
  let id = String(userData && userData.$id ? userData.$id : userData?.userData?.$id);
  // Logging to debug id
  console.log('Extracted user ID:', id);

  // Checking if the logged-in user is the author of the post
  const isAuthor = String(post && userData ? post.userid === id : false);

    // Logging to debug post.userId and isAuthor
    console.log('Post User ID:', post?.userId);
    console.log('isAuthor:', isAuthor);

  // Logging to debug slug
  console.log('Extracted slug from URL:', slug);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) { // Checking if slug exists
        try {
          const post = await appwriteService.getPost(slug); // Fetching post data using the slug
          if (post) {
            setPost(post); // Setting the retrieved post data to state
          } else {
            navigate('/'); // Navigating to the home page if post data is not found
          }
        } catch (error) {
          console.error('Error fetching post:', error); // Logging error if fetching post data fails
          navigate('/'); // Navigating to the home page in case of error
        }
      } else {
        navigate('/'); // Navigating to the home page if slug is not available
      }
    };

    fetchPost(); // Calling the fetchPost function when the component mounts or when the slug changes
  }, [slug, navigate]); // Dependency array for the useEffect hook

  // Function to delete a post
  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id); // Deleting the post from the database
      if (status) {
        await appwriteService.deleteFile(post.featuredImage); // Deleting the associated featured image file
        navigate('/'); // Navigating to the home page after successful deletion
      }
    } catch (error) {
      console.error('Error deleting post:', error); // Logging error if post deletion fails
    }
  };

  return post ? ( // Conditional rendering of post content
    <div className="py-8 flex justify-center"> {/* Container for the post */}
      <div className="max-w-[57rem]"> {/* Container for limiting post width */}
        <Container> {/* Wrapper for post content */}
          <div className="w-full flex justify-center mb-4 relative border rounded-xl overflow-hidden">
            <img
              src={appwriteService.seeFilePreview(post.featuredImage)} // Rendering the featured image of the post
              alt={post.title} // Setting alt text for the image
              className="max-h-80 w-auto max-w-full h-auto object-contain mx-auto" // Styling for the image
            />

            {/* Button group for edit and delete actions, displayed only if the logged-in user is the author of the post */}
            {isAuthor && (
              <div className="absolute right-6 top-6 space-x-2">
                <Link to={`/edit-post/${post.$id}`}> {/* Link to the edit post page */}
                  <Button bgColor="bg-green-500">Edit</Button> {/* Button for editing the post */}
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}> {/* Button for deleting the post */}
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1> {/* Title of the post */}
          </div>

          {/* Parsing and rendering the HTML content of the post */}
          <div className="browser-css text-left leading-relaxed">
            {parse(String(post.content))}
          </div>
        </Container>
      </div>
    </div>
  ) : null; // Return null if post data is not available
}

