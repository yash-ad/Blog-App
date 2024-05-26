import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index'; // Importing reusable form components
import appwriteService from '../../appwrite/config'; // Importing appwriteService for interacting with the backend
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import { useSelector } from 'react-redux'; // Importing useSelector hook to access Redux store

function PostForm({ post }) {
  // Destructuring useForm hook for form management
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || '', // Default value for title from post prop or empty string
      slug: post?.$id || '', // Default value for slug from post prop's $id or empty string
      content: post?.content || '', // Default value for content from post prop or empty string
      status: post?.status || 'active', // Default value for status from post prop or 'active'
    },
  });

  // Hook for navigation
  const navigate = useNavigate();
  
  // Get userId from Redux store
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.$id ?? userData?.userData?.$id;

  // Function to handle form submission
  const submit = async (data) => {
    try {
      let fileId = post?.featuredImage;

      // Check if there's an image file attached
      if (data.image?.length > 0) {
        // Upload the file and get its ID
        const file = await appwriteService.uploadFile(data.image[0]);
        fileId = file.$id;
        // If the post already has a featured image, delete it
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      // If it's an existing post, update it
      if (post) {
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: fileId,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`, { replace: true });
        }
      } 
      // If it's a new post, create it
      else {
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: fileId,
          userId,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('An error occurred while submitting the post. Please try again.');
    }
  };

  // Function to transform title into slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
    return '';
  }, []);

  // Effect to watch changes in the title and update the slug accordingly
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // JSX for the form
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full lg:w-2/3 px-2 text-center">
        <Input
          label={
            <>
              Title <span className="text-red-500">*</span>:
            </>
          }
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        <Input
          label={
            <>
              Slug/Url <span className="text-red-500">*</span>:
            </>
          }
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className="w-full lg:w-1/3 px-2">
        <Input
          label={
            <>
              Featured Image <span className="text-red-500">*</span>:
            </>
          }
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('status', { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? 'bg-green-500' : 'bg-blue-600'}
          className={`${
            post
              ? 'hover:shadow-green-500 text-black'
              : 'hover:shadow-blue-800 text-black'
          } shadow-sm hover:cursor-pointer duration-500 hover:drop-shadow-2xl rounded-lg w-full`}
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
