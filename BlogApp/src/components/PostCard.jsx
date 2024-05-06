
import appwriteService from '../appwrite/conf'

//Passed the props in a paramter of function:-
function PostCard({$id,title,featuredImage}) {
  return (
//   Every card should be clickable thats why we are using here '<Link>'
  <link to={`/post/${$id}`}>
  <div className='w-full bg-gray-100 rounded-xl p-4'>
  <div className='w-full justify-center mb-4'>
  {/* //For image preview we are implementing the method:-For previewing the file:- */}
{/* getFilePreview(fileId)  from appWrite* here the 'featuredImage it accepts as an id*/}
    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
  </div>
  <h2 className='text-xl font-bold'>{title}</h2>
  </div>
  </link>
  )
}

export default PostCard