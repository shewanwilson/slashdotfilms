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
  try {
    const { thread_title, op_body } = req.body;
    const board_id = req.params.board_id;
    const started_by_user_id = req.session.user_id;

    console.log('Session User ID in ThreadController = ' + started_by_user_id);

    if (!started_by_user_id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!thread_title || !op_body) {
      return res.status(400).json({
        message: "Thread title and body are required"
      });
    }

    const thread_id = await ThreadModel.createThread(
      thread_title,
      op_body,
      board_id,
      started_by_user_id
    );

    res.status(201).json({ thread_id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

