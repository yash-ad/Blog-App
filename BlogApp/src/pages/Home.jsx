import { useState, useEffect } from "react";
import appWriteService from '../appwrite/conf.js'; // Import appWriteService for fetching posts
import { Container, PostCard } from '../components'; // Import Container and PostCard components

function Home() {
    const [posts, setPosts] = useState([]); // State variable to hold posts data

    useEffect(() => {
        // Fetch posts when the component mounts
        appWriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents); // Set the posts state variable with the fetched posts
            }
        });
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    return (
        <div className='w-full py-8'>
            <Container>
                {/* Conditionally render based on the length of posts array */}
                {posts.length === 0 ? (
                    // Render this if there are no posts
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mt-4 hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                ) : (
                    // Render posts if there are posts available
                    <div className='flex flex-wrap'>
                        {/* Map through posts array and render each post using PostCard component */}
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
