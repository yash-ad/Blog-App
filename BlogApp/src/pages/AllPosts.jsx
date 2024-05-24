import  { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import appwriteService from '../appwrite/config'

function AllPosts() {
  const [posts, setPosts] = useState([])


  useEffect(() => {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents)
          // setLoading(false)
        }
      })
  }, [])



  return (
    <div className="w-full py-8">
      <div>
        <h1 className="text-[2rem] md:text-[2.5rem] text-center font-semibold">
          All Posts
        </h1>
      </div>
      <Container>
        {posts.length > 0 ? (
          <div className="columns-1 md:columns-1 lg:columns-2 xl:columns-3 gap-4 p-4">
            {posts.map((post) => (
              <div key={post.$id} className="break-inside-avoid mb-4">
                <PostCard id={post.$id}
								title={post.title}
								featuredImage={post.featuredImage} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>Nothing to Show</p>
          </div>
            )}
      </Container>
    </div>
  )
}

export default AllPosts