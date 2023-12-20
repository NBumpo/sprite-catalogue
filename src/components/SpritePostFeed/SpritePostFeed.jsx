
import SpritePostCard from "../SpritePostCard/SpritePostCard"




export default function SpritePost({ posts, deletePost }) {
  const spritePost = posts.map((post) => {
    return <SpritePostCard post={post} key={post._id} deletePost={deletePost} />
  })
  return (

    <div className="feed">
      {spritePost}




    </div>


  )
}