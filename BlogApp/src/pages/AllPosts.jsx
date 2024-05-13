import { useState, useEffect } from 'react';
import appWriteService from '../appwrite/conf'; // Import the appWriteService for fetching posts
import { Container, PostCard } from '../components'; // Import the Container and PostCard components

function AllPosts() {
    // Define state variables to hold the posts
    const [posts, setPosts] = useState([]);

    // useEffect hook to fetch posts when the component mounts
    useEffect(() => {
        // Call the getPosts method from the appWriteService to fetch posts
        // Pass an empty array as the query parameter to retrieve all posts
        appWriteService.getPosts([]).then((posts) => {
            // If posts are fetched successfully, update the state with the posts data
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

    return (
        <div className='w-full py-8'>
            {/* Container component for layout */}
            <Container>
                <div className='flex flex-wrap'>
                    {/* Map through the posts array and render a PostCard component for each post */}
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            {/* Pass the post data as props to the PostCard component */}
                            <PostCard data={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
