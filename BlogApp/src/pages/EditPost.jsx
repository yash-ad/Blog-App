import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks from React
import { useNavigate, useParams } from 'react-router-dom'; // Importing useNavigate and useParams hooks from React Router DOM
import { Container, PostForm } from '../components/index'; // Importing the Container and PostForm components from their respective paths
import appwriteService from '../appwrite/config'; // Importing the appwriteService from its path

function EditPost() {
  const [post, setPost] = useState(null); // Initializing state variable 'post' as null using useState hook
  const { slug } = useParams(); // Extracting the 'slug' parameter from the URL using useParams hook
  const navigate = useNavigate(); // Initializing the navigate function to navigate between routes

  useEffect(() => { // Running a side effect to fetch the post when the component mounts or 'slug' changes
    const fetchGetPost = async () => { // Defining an asynchronous function 'fetchGetPost'
      try {
        if (slug) { // Checking if 'slug' exists
          const fetchedPost = await appwriteService.getPost(slug); // Fetching the post using 'getPost' function from appwriteService
          if (fetchedPost) { // Checking if the post is successfully fetched
            setPost(fetchedPost); // Updating the 'post' state with the fetched post
          } else {
            console.error('Post not found'); // Logging an error message if the post is not found
            navigate('/'); // Redirecting to the homepage if the post is not found
          }
        } else {
          navigate('/'); // Redirecting to the homepage if 'slug' does not exist
        }
      } catch (error) {
        console.error('Error fetching post:', error); // Logging any errors that occur during the fetching process
        navigate('/'); // Redirecting to the homepage if there is an error fetching the post
      }
    };

    fetchGetPost(); // Calling the 'fetchGetPost' function when the component mounts or 'slug' changes
  }, [slug, navigate]); // Running the effect when 'slug' or 'navigate' changes

  if (!post) { // Checking if 'post' is null
    return <div>Loading...</div>; // Displaying a loading message if 'post' is null
  }

  return (
    <div className='py-8'> {/* Container for the Edit Post page */}
      <div>
        <h1 className='text-[2rem] md:text-[2.5rem] text-center font-semibold'>Edit Post</h1> {/* Title for the Edit Post page */}
      </div>
      <Container> {/* Container component to manage layout */}
        <PostForm post={post} /> {/* Rendering the PostForm component with the fetched post */}
      </Container>
    </div>
  );
}

export default EditPost; // Exporting the EditPost component for use in other parts of the application
