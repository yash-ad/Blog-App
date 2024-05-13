import { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, RealTimeEditor } from '../index';
import { useSelector } from 'react-redux';
import appWriteService from '../../appwrite/conf.js';
import { useForm } from "react-hook-form";

function PostForm({ postData }) {
    // Initialize form state and configuration using react-hook-form
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: postData?.title || '',
            slug: postData?.slug || '',
            content: postData?.content || '',
            status: postData?.status || 'active'
        }
    });

    // Navigation hook for programmatic navigation
    const navigate = useNavigate();
    // Get user data from Redux store
    const userData = useSelector((state) => state.auth.userData);

    // Handle form submission
    const submit = async (data) => {
        // Upload image file if provided and update post data using appWriteService
        if (postData) {
            // Update existing post
            // Upload file if provided
            const file = data.image[0] ? appWriteService.uploadFile(data.image[0]) : null;
            if (file) {
                appWriteService.deleteFile(postData.featuredImage);
            }
            const dataBasePost = await appWriteService.updatePost(postData.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            });
            if (dataBasePost) {
                navigate(`/post/${dataBasePost.$id}`);
            }
        } else {
            // Create new post
            const file = await appWriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appWriteService.createPost({
                    ...data,
                    userId: userData.$id
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    // Transform title into a slug whenever the title field changes
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return "";
    });

    // Subscribe to changes in the title field using watch
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });
        // Unsubscribe when component unmounts for optimization
        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                {/* Input fields for title, slug, and content */}
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(event) => {
                        setValue("slug", slugTransform(event.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RealTimeEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                {/* Input fields for featured image, status, and submit button */}
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !postData })}
                />
                {postData && (
                    // Display current featured image if it exists
                    <div className="w-full mb-4">
                        <img
                            src={appWriteService.getFilePreview(postData.featuredImage)}
                            alt={postData.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={postData ? "bg-green-500" : undefined} className="w-full">
                    {postData ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;

