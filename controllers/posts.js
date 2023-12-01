const Post = require("../models/post");

// import the s3 constructor (class)
const S3 = require('aws-sdk/clients/s3');
// initalize the s3 construcotr to give is the object that can perform
// our crud operations on our s3 bucket
const s3 = new S3()

// require nodes unique id function 
const { v4: uuidv4 } = require('uuid');

module.exports = {
  create,
  index,
  delete: deletePost
};



function create(req, res) {
    console.log(req.file, req.body, req.user)
    // check to make sure a file was sent over
    if(!req.file) return res.status(400).json({error: 'Please submit a photo'})
  
    // now submit file to aws!
    const filePath = `spritecatalogue/${uuidv4()}-${req.file.originalname}`
    // then make the params object that s3 object wants to send to send to aws s3 bucket
    const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer} 
    // upload it s3
    s3.upload(params, async function(err, data){ // <- data is the response from aws with data.Location (where your file is stored)
      // we want to put data.Location value in the db
      if(err){
        console.log('=========================')
        console.log(err, ' <-- error from aws, probably wrong keys in your code ~/.aws/credentials file, or you have the wrong bucket name, are you sure you know what process.env.BUCKET_NAME is, did you log it out?')
        console.log('==========================')
      } 
  
      // Now we want to use our model to create the POST in the database!
      try {
        // adding the information to the db
        const postDoc = await Post.create({
          user: req.user, // req.user is from the jwt, token the client sent over (config/auth) is where req.user is set from the token
          photoUrl: data.Location, // <- data.Location is the response from aws, where our photo is stored
          caption: req.body.caption, // req.body contains the text inputs from the form request
          title: req.body.title,
          spriteType: req.body.spriteType

        })
  
        // populate the users information
        await postDoc.populate('user')
        // respond to the client!
        // status 201, means resource created!
        res.status(201).json({post: postDoc}) 
  
      } catch(err){
        console.log(err, " <- error in create post")
        res.json({error: 'Problem with creatinga post, try again'})
      }
    })
  
  
  
  }

  async function index(req, res) {
    try {
      // this populates the user when you find the posts
      // so you'll have access to the users information
      // when you fetch teh posts
      const posts = await Post.find({}).populate("user").exec();
      res.status(200).json({ posts });
    } catch (err) {
      res.json({error: err})
    }
  }

async function deletePost(req, res){

    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        post.likes.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await post.save() // after you mutate a document you must save
        res.json({data: 'post removed'})
    } catch(err){
        res.status(400).json({err})
    }
}