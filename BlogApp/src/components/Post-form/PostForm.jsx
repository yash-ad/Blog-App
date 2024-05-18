import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from ".."; // Import necessary components
import appwriteService from "../../appwrite/config"; // Import appwriteService
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useSelector } from "react-redux"; // Import useSelector for accessing Redux state

export default function PostForm({ post }) {
    // Initialize form handling using useForm hook
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "", // Set default title value if available
            slug: post?.$id || "", // Set default slug value if available
            content: post?.content || "", // Set default content value if available
            status: post?.status || "active", // Set default status value if available
        },
    });

    const navigate = useNavigate(); // Initialize navigate to use for redirecting
    const userData = useSelector((state) => state.auth.userData); // Get user data from Redux state

    // Function to handle form submission
	const submit = async (data) => {
		if (post) {
			const file = data.image[0]
				? await appwriteService.uploadFile(data.image[0])
				: null;

			if (file) {
				appwriteService.deleteFile(post.featuredImage);
			}

			if (post.$id !== data.slug) {
				const dbPost = await appwriteService.createPost({
					...data,
					userId: userData.$id,
					featuredImage: file ? file.$id : post.featuredImage,
				});

				if (dbPost) {
					appwriteService.deletePost(post.$id).then((status) => {
						if (status) {
							if (file) {
								appwriteService.deleteFile(post.featuredImage);
							}
							// dispatch(deletePost(post.$id));
						}
					});

					console.log("create and delete");
					// dispatch(addPost(dbPost));
					navigate(`/post/${dbPost.$id}`);
				}
			} else {
				const dbPost = await appwriteService.updatePost(post.$id, {
					...data,
					featuredImage: file ? file.$id : undefined,
				});

				if (dbPost) {
					console.log("update");
					// dispatch(updatePost(dbPost));
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
         else {
			const file = await appwriteService.uploadFile(data.image[0]);

			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId;
				const dbPost = await appwriteService.createPost({
					...data,
					userId: userData.$id,
				});

				if (dbPost) {
					// dispatch(addPost(dbPost));
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
	};



    // Function to transform title into slug
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    // Watch for changes in the title field and update the slug field accordingly
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap"> {/* Form submission handler */}
            <div className="w-2/3 px-2"> {/* Left side form fields */}
                <Input
                    label="Title :" // Title input field
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })} // Register title input field with validation
                />
                <Input
                    label="Slug :" // Slug input field
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })} // Register slug input field with validation
                    onInput={(e) => { // Update slug value based on title input
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} /> {/* Rich text editor for content */}
            </div>
            <div className="w-1/3 px-2"> {/* Right side form fields */}
                <Input
                    label="Featured Image :" // Featured image input field
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })} // Register featured image input field with validation
                />
                {post && ( // Show current featured image if available
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]} // Options for post status
                    label="Status" // Status select field
                    className="mb-4"
                    {...register("status", { required: true })} // Register status select field with validation
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full"> {/* Submit button */}
                    {post ? "Update" : "Submit"} {/* Button text changes based on whether it's an update or submission */}
                </Button>
            </div>
        </form>
    );
}
