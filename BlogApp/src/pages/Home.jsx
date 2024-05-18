// Import React, useEffect, and useState hooks
import { useEffect, useState } from 'react';

// Import appwriteService for fetching posts and Container, PostCard components for UI
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

// Home component to display posts
function Home() {
    // State to store fetched posts
    const [posts, setPosts] = useState([]);

    // Effect hook to fetch posts on component mount
    useEffect(() => {
        // Fetch posts using appwriteService
        appwriteService.getPosts().then((posts) => {
            // If posts exist, update state with fetched posts
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []); // Dependency array ensures effect runs only on mount

    // Render message if no posts are available
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Render posts if available
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

// Export the Home component
export default Home;
