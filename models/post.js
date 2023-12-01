const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
  username: String,
  // One User has many likes, referencing because we have user model, so we can get the users information when we need it
  //
  userId: { type: mongoose.Schema.Types.ObjectId },
});


// One a user has many posts 
// A post belongs to a User
const spritePostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  photoUrl: String,
  caption: String,
  spriteType: {
    type: String,
    // enum: ['player', 'npc', 'enemy', 'structure', 'effect', 'item']
  },
  // One Post has many likes, we are using embedding, because the likes will always be tied to the post, so no reason
  // to make a likes model
  likes: [likesSchema],
});


module.exports = mongoose.model("SpritePost", spritePostSchema);
