import { useState, useEffect } from 'react'; // Importing useState and useEffect hooks from React
import { Container, PostCard } from '../components/index'; // Importing the Container and PostCard components from their respective paths
import appwriteService from '../appwrite/config'; // Importing the appwriteService from its path

function AllPosts() {
  const [posts, setPosts] = useState([]); // Initializing state variable 'posts' as an empty array using useState hook

  useEffect(() => {
    const fetchPosts = async () => { // Defining an asynchronous function 'fetchPosts' using async keyword
      try {
        const response = await appwriteService.getPosts([]); // Calling the 'getPosts' function from appwriteService to fetch posts
        if (response) {
          console.log('Fetched Posts:', response.documents); // Logging the fetched posts to the console for debugging
          setPosts(response.documents); // Updating the 'posts' state with the fetched posts
        } else {
          console.error('Failed to fetch posts'); // Logging an error message if fetching posts fails
        }
      } catch (error) {
        console.error('Error fetching posts:', error); // Logging any errors that occur during the fetching process
      }
    };

    fetchPosts(); // Calling the 'fetchPosts' function when the component mounts
  }, []); // Running the effect only once when the component mounts, indicated by an empty dependency array

  return (
    <div className="w-full py-8"> {/* Container for the All Posts page */}
      <div>
        <h1 className="text-[2rem] md:text-[2.5rem] text-center font-semibold">
          All Posts {/* Title for the All Posts page */}
        </h1>
      </div>
      <Container> 
        {posts.length > 0 ? ( 
          <div className="columns-1 md:columns-1 lg:columns-2 xl:columns-3 gap-4 p-4"> 
            {posts.map((post) => ( 
              <div key={post.$id} className="break-inside-avoid mb-4"> {/* Div for each individual post */}
                <PostCard {...post}/> 
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>Loading your content...</p> {/* Displaying a loading message if no posts are available */}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts; // Exporting the AllPosts component for use in other parts of the application
