const BoardModel = require('../models/boardModel'); 

exports.getAllMainBoards = async (req, res) => {  
  try { 
    
    const boards = await BoardModel.getAllMainBoards();

    if (!boards) return res.status(404).json({ message: "Boards not found" }); 
    res.json(boards);

  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
}; 

// Only used for testing at present
exports.postNewBoard = async (req, res) => {
  try{

    const { board_name, board_type } = req.body;
    
    if (!board_name || !board_type) {
      return res.status(400).json({
        message: "Board name and board type are required"
      });
    }

    const newBoardId = await BoardModel.createNewBoard(board_name, board_type);

    res.status(201).json({ newBoardId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }

  

}
