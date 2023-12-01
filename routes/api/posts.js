const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');

const multer  = require('multer')
const upload = multer()
// /*---------- Public Routes ----------*/
// /api/posts 

// 'photo' comes from the key name in FeedPage/handlesubmit
// formData.append('photo', photo); matching the first arg
router.post('/', upload.single('photo'), postsCtrl.create);

// /api/posts the index functions job is to return all of the posts
router.get('/', postsCtrl.index)
router.delete('/:id', postsCtrl.delete)

/*---------- Protected Routes ----------*/




module.exports = router;