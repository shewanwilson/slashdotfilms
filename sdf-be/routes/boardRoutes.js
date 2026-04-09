const express = require('express'); 
const router = express.Router(); 
const boardController = require('../controllers/boardController'); 

router.get('/boards', boardController.getAllMainBoards);
router.post('/board/new', boardController.postNewBoard);

module.exports = router; 




