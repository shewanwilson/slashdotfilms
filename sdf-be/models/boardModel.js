const db = require('../config/db');

const Board = {
    getAllMainBoards: async() => {
        const [rows] = await db.query("SELECT * FROM board WHERE board_type='main' OR board_type='featured'");
        return rows;
    },
    createNewBoard: async(board_name, board_type) => {
        const [result] = await db.query(
        "INSERT INTO board (board_name, board_type) VALUES (?, ?)", [board_name, board_type]);        
        return result.insertId;
     }      
}; 

module.exports = Board;