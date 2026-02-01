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

exports.postNewThread = async (req, res) => {

  try{
    console.log('BODY:', req.body);
    const {thread_title} = req.body;
    const board_id = req.params.board_id;
    const started_by_user_id = req.params.user_id;
    
    const newThread = await ThreadModel.postNewThread(thread_title, board_id, started_by_user_id);

    res.status(201).json(newThread);

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

