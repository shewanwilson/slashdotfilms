const ThreadModel = require('../models/threadModel'); 

exports.getThreadsByBoardId = async (req, res) => {  
  try { 
    
    const threads = await ThreadModel.getThreadsByBoardId(req.params.board_id);

    if (!threads) return res.status(404).json({ message: "Threads not found" }); 
    res.json(threads); 
  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
}; 

