// Import necessary components
import { Container, PostForm } from '../components';

// AddPost component for adding a new post
function AddPost() {
  return (
    // Wrapper div with padding
    <div className='py-8'>
      {/* Container component for layout */}
      <Container>
        {/* PostForm component for adding new post */}
        <PostForm />
      </Container>
    </div>
  );
}

// Export the AddPost component
export default AddPost;
