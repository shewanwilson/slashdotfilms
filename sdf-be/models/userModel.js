const db = require('../config/db');

exports.findByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT id, email, password_hash FROM board_user WHERE email = ?",
    [email]
  );

  return rows[0] || null;
};

exports.createUser = async (username, email, password_hash) => {
  const [result] = await db.query(
    "INSERT INTO board_user (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email, password_hash]
  );

  return { id: result.insertId, username, email };
};
