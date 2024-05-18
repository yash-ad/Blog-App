// Import necessary hooks from React
import { useState, useEffect } from 'react';

// Import necessary components
import { Container, PostCard } from '../components';

// Import appwriteService for fetching posts
import appwriteService from "../appwrite/config";

// AllPosts component for displaying all posts
function AllPosts() {
    // State to store fetched posts
    const [posts, setPosts] = useState([]);

    // useEffect hook to fetch posts on component mount
    useEffect(() => {
        // Function to fetch posts using appwriteService
        appwriteService.getPosts([]).then((posts) => {
            // If posts exist, update state with fetched posts
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []); // Empty dependency array, so the effect runs only once on mount

    // Return JSX to render all posts
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {/* Map over posts array and render each post using PostCard component */}
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

// Export the AllPosts component
export default AllPosts;
