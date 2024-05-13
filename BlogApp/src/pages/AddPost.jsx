import { Container, PostForm } from "../components"; // Import Container and PostForm components

function AddPost() {
    return (
        <div className='py-8'>
            {/* Container component for layout */}
            <Container>
                {/* PostForm component for adding a new post */}
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;
