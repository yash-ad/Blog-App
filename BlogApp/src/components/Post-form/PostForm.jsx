//These imports are required for managing state,form handling,navigation and API calls:-
import { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, RealTimeEditor } from '../index';
import { useSelector } from 'react-redux';
import appWriteService from '../../appwrite/conf.js';
import { useForm } from "react-hook-form";

//A form component named 'PostForm' that is used to create or update posts.
//This function component takes 'postData' as a prop,which represents the post data,if it exists that means the form is for updating an existing post otherwise its for creating a new one:-
function PostForm({ postData }) {

    //'useForm' hook is used to intialize the form state and configuration.
    // It provides methods like register, handleSubmit, watch, control, setValue, and getValues for managing form inputs and submission.
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: postData?.title || '',
            slug: postData?.slug || '',
            content: postData?.content || '',
            status: postData?.status || 'active'
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    //Handling form-submisson:-
    // The submit function is called when the form is submitted. 
    //If a post exists, it updates the post data; otherwise, it creates a new post.
    const submit = async (data) => {
        //It uploads an image file if provided and updates the post data accordingly using the appWriteService.
        if (postData) {
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

    //The 'slugTransform' function transforms the title into a slug.
    // whenever the title field changes. 
    //It cleans up the title and replaces spaces with hyphens, making it suitable for URLs.
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return "";
    });

    //An effect is used to subscribe to changes in the title field using watch. 
    //Whenever the title changes, it updates the slug field accordingly using setValue.
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });
        //For optimization:-
        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        // Form Structure:-
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        {/*The form is divided into two parts using Flexbox: the left part (w-2/3) contains inputs for title, slug, and content, while the right part (w-1/3) contains inputs for the featured image, status, and the submit button. */}
            <div className="w-2/3 px-2">
            {/* Input fields are rendered using the Input component. The RealTimeEditor component is used for the content field, allowing real-time editing. */}
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
            {/* Depending on whether it's an update or create operation (post exists or not), different UI elements are rendered. For example, if it's an update operation, the current featured image is displayed. */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !postData })}
                />
                {postData && (
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
