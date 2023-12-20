






export default function SpritePostCard({ post, deletePost }) {
    console.log(post.photoUrl)
    return post ? (
        <div className="spritepostcard">
            <h2>{post.title}</h2>

            <img src={post.photoUrl} alt="sprite image" className="spritecardimg" />
            <p>{post.caption}</p>
            <h3>{post.spriteType}</h3>
            <button onClick={() => deletePost(post._id)} className="carddeletebutton">
                Delete
            </button>
        </div>
    ) : null;

}