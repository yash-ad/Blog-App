import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import appWriteService from "../appwrite/conf";

function Post() {
    // State variables
    const [post, setPost] = useState(null);

    // Navigate function from react-router-dom
    const navigate = useNavigate();

    // Get the slug parameter from the URL
    const { slug } = useParams();

    // Get user data from redux store
    const userData = useSelector((state) => state.auth.userData);

    // Check if the user is the author of the post
    const isAuthor = post && userData ? post.userId === userData.$Id : false;

    // Fetch post data based on the slug
    useEffect(() => {
        if (slug) {
            appWriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    // Function to delete a post
    const deletePost = () => {
        appWriteService.deletePost(post.$Id).then((status) => {
            if (status) {
                appWriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    // Render post if available
    return post ? (
        <div className="py-8">
            <Container>
                {/* Post Image */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appWriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {/* Edit and Delete buttons for author */}
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
                {/* Post Title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                {/* Post Content */}
                <div className="browser-css">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}

export default Post;
