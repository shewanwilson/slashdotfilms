const express = require('express'); 
const router = express.Router(); 
const postController = require('../controllers/postController'); 
router.get('/posts', postController.getPosts); 
router.get('/board/:board_id/thread/:thread_id', postController.getPostsByThreadId);
router.post('/thread/:thread_id/reply', postController.postPostReply); 
module.exports = router; 
