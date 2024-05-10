import { useCallback,useEffect } from "react";
import{useNavigate} from 'react-router-dom';
import {Button,Input,Select,RealTimeEditor} from '../index'
import {useSelector} from 'react-redux';
import appWriteService from '../../appwrite/conf.js';
import { useForm } from "react-hook-form";




//Values are from 'post' the user has passed some information.
function PostForm({post}) {

//Initially lets write some functionalities:-

//1.Information from React-hook-form:-
 //What is 'watch' from React-hook-form?
 //Watch is basically used for subscribe to input changes.
 //What is setValue from React-hook-form?
 //'setValue' is used for update field value.
 //What is 'getValues' from React-hook-form?
 //'getValues' is used for get form values.
 //'useForm' takes an object.
const {register,handleSubmit,watch,control,setValue,getValues} = useForm({
    defaultValues:{
        //If the user's information is coming from post then show the previous post or else keep it empty.
        title:post?.title || '',
        slug:post?.slug || '',
        content:post?.content || '',
        status:post?.status || 'active'
    }
})

const navigate = useNavigate();

const userData = useSelector((state)=> state.auth.userData)


//If the user has been submitted the form , obviously passed the 'data'.
const submit = async(data)=>{

    //If there is a post , then update the file:-
    if(post){
  // If there is an image, upload the file, otherwise set file to null
    const file = data.image[0] ? appWriteService.uploadFile(data.image[0]) : null

    // If there is a previous post available, delete the older image of that post
    if(file){
        appWriteService.deleteFile(post.featuredImage)
    }

    //Update the post , 'updatePost()' from appWrite service, it takes slug that means its an id of post:-
    // Here the the slug is 'post.$id
    //Spreading the existing data with an overwriting value featuredImage
    // if there is a file then there that file has an uniqueId that is stored into the featuredImage and if its not the its undefined
    const dataBasePost = await appWriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
    });
    // Navigate then user to the updated post
        if(dataBasePost){
            navigate(`/post/${dataBasePost.$id}`);
        }

    }
    //What else if there is post not available:-
    //User wants to create a new file and then upload it.
    //So lets create a file 
    else{
        
// const file = data.image[0]? await appWriteService.uploadFile(data.image[0]) : null
//uploadFile is likely an asynchronous operation, 
//meaning it returns a Promise.
// To properly handle asynchronous operations, 
//you should use await to wait for the Promise to resolve.
//await should be used when calling an asynchronous function to ensure proper sequencing of operations.
// If uploadFile encounters an error, using await allows you to catch and handle it using try...catch. This is essential for robust error handling in asynchronous code..
const file = await appwriteService.uploadFile(data.image[0]);

//If there is a file then store into the fileId:-
if(file){
    const fileId = file.$id;
    //Data then there is a featuredImage then update the fileId:-
data.featuredImage = fileId;
//Updated the property and rest of the properties should be update:-
//Send the data to appWrite service and we know that app createPost() from appWrite its an asynchronous operation
//That means it returns a promise 
// To properly handle asynchronous operations, 
//We should use await to wait for the promise to resolve
//await should be used when calling an asychronous operation:-
const dbPost = await appWriteService.createPost({
    ...data,
    userId:userData.$id
})

if(dbPost){
    navigate(`/post/${dbPost.$id}`);
}
}
}
    
} 

///.One:-Interesting Concept to crack the interviews:-
const slugTransform = useCallback((value)=>{
//If there ia 'value' available && which is true and the value is the type of is strict equals to the string then return the value:-
if(value && typeof value === 'string'){
    return value
    .trim()
    .toLowerCase()
    //This is a regular expression to check:-
    .replace(/[^a-zA-Z\d\s]+/g, "-")
    .replace(/\s/g, "-");
}
//If its not the returns an empty string:-
return "";
})


///.Two:-
useEffect(()=>{
    const subscription = watch((value,{name})=>{
if(name === 'title'){
    setValue('slug',slugTransform(value.title),{
        shouldValidate : true })
}
})
    //For optimization:-
    return ()=>{
        subscription.unsubscribe();
    }
},[watch,slugTransform,setValue])


  return (
    //The form is divided into two parts:-
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
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
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RealTimeEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appWriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
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
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

export default PostForm