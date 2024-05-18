// Import necessary hooks and components
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

// Post component to display a single post
export default function Post() {
    // State to store the fetched post
    const [post, setPost] = useState(null);

    // Extract slug from URL params
    const { slug } = useParams();

    // Hook for navigation
    const navigate = useNavigate();

    // Select user data from Redux store
    const userData = useSelector((state) => state.auth.userData);

    // Check if the current user is the author of the post
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Effect hook to fetch post data based on slug
    useEffect(() => {
        // Fetch post using appwriteService based on slug
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]); // Dependency array including slug and navigate

    // Function to delete the post
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    // Render post content if available
    return post ? (
        <div className="py-8">
            <Container>
                {/* Post featured image */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {/* Edit and Delete buttons for the author */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                {/* Post title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                {/* Post content */}
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null; // Render nothing if post data is not available
}
