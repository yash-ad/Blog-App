import { useState, useEffect } from "react";
import appWriteService from '../appwrite/conf'; // Import the appWriteService for fetching and updating posts
import { Container, PostForm } from '../components'; // Import the Container and PostForm components
import { useNavigate, useParams } from "react-router-dom"; // Import hooks for navigation and getting URL parameters

function EditPost() {
    // Define state variables
    const [post, setPost] = useState(null); // State variable to hold the post data

    // Get values from URL parameters
    const { slug } = useParams();

    // Hook for navigation
    const navigate = useNavigate();

    // useEffect() hook to fetch post data when the component mounts or when the slug changes
    useEffect(() => {
        // Check if a slug exists
        if (slug) {
            // Fetch the post data using the appWriteService based on the slug
            appWriteService.getPost(slug).then((post) => {
                // If post data is fetched successfully, update the post state variable
                setPost(post);
            });
        } else {
            // If no slug exists, navigate back to the home page
            navigate('/');
        }
    }, [slug, navigate]); // Dependency array ensures that this effect runs when the slug or navigation function changes

    // Conditionally render the PostForm component if post data exists, otherwise render null
    return post ? (
        <div className='py-8'>
            {/* Container component for layout */}
            <Container>
                {/* Render the PostForm component and pass the post data as props */}
                <PostForm data={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
