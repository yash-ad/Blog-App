import { Container, PostForm } from '../components/index'; // Importing the Container and PostForm components from their respective paths

function AddPost() {
  return (
    <div className='py-8'> {/* Container for the Add Post page */}
      <div>
      <h1 className=' text-[2rem] md:text-[2.5rem] text-center font-semibold' >Add Post</h1></div> {/* Title for the Add Post page */}
        <Container> {/* Container component to manage layout */}
            <PostForm /> {/* PostForm component for adding a new post */}
        </Container>
    </div>
  );
}

export default AddPost; // Exporting the AddPost component to make it available for use in other parts of the application
