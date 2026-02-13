const express = require('express'); 
const router = express.Router(); 
const threadController = require('../controllers/threadController'); 

router.get('/threads/:board_id', threadController.getThreadsByBoardId);
router.post('/thread/new/:board_id', threadController.postNewThread);  

module.exports = router; 