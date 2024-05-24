
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({ $id,title, featuredImage}) {
  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className='flex flex-col items-center text-center card-hover rounded-xl p-4 h-auto shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </Link>
    </>
  )
}

export default PostCard