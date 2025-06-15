const express = require('express'); 
const router = express.Router(); 
const threadController = require('../controllers/threadController'); 
//router.get('/thread/', threadController.getThreads); 
router.get('/threads/:board_id', threadController.getThreadsByBoardId); 

module.exports = router; 