// Import necessary hooks from React and components
import { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';

// Import appwriteService for fetching and updating posts
import appwriteService from "../appwrite/config";

// Import necessary hooks from react-router-dom for navigation and accessing URL parameters
import { useNavigate, useParams } from 'react-router-dom';

// EditPost component for editing a specific post
function EditPost() {
    // State to store the fetched post
    const [post, setPost] = useState(null);

    // Extracting slug from URL params
    const { slug } = useParams();

    // Hook for navigation
    const navigate = useNavigate();

    // Effect hook to fetch post data based on slug
    useEffect(() => {
        // Check if slug exists
        if (slug) {
            // Fetch post using appwriteService based on slug
            appwriteService.getPost(slug).then((post) => {
                // If post is found, set the post state
                if (post) {
                    setPost(post);
                }
            });
        } else {
            // If slug does not exist, navigate to the home page
            navigate('/');
        }
    }, [slug, navigate]); // Dependency array including slug and navigate

    // Render the PostForm if post exists, otherwise render null
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

// Export the EditPost component
export default EditPost;
