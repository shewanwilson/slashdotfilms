const db = require('../config/db');
const ThreadModel = require('../models/threadModel');
const PostModel = require('../models/postModel');

/**
 * Get all threads for a board
 */
exports.getThreadsByBoardId = async (req, res) => {
  try {
    const threads = await ThreadModel.getThreadsByBoardId(req.params.board_id);

    if (!threads) {
      return res.status(404).json({ message: "Threads not found" });
    }

    res.json(threads);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * Create a new thread
 * (thread + OP post in one transaction)
 */
exports.postNewThread = async (req, res) => {
  const DB_CONNECTION = await db.getConnection();

  try {
    const { post_title, post_body } = req.body;
    const board_id = req.params.board_id;
    const user_id = req.session.user_id || req.headers['bruno-test-user-id'];

    if (!user_id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!post_title || !post_body) {
      return res.status(400).json({
        message: "Title and body are required"
      });
    }

    await DB_CONNECTION.beginTransaction();

    // 1. Create thread (metadata only)
    const thread_id = await ThreadModel.createThread(
      DB_CONNECTION,
      board_id,
      user_id
    );

    // 2. Create OP post
    await PostModel.createPost(DB_CONNECTION, {
      thread_id,
      parent_id: 0,
      post_author_id: user_id,
      post_title,
      post_body
    });

    // thread defaults handle:
    // no_of_posts = 1
    // time_of_last_post = NOW()

    await DB_CONNECTION.commit();

    res.status(201).json({ thread_id });

  } catch (error) {
    await DB_CONNECTION.rollback();
    console.error(error);
    res.status(500).json({ message: "Failed to create thread" });

  } finally {
    DB_CONNECTION.release();
  }
};


/**
 * Delete thread
 */
exports.deleteThread = async (req, res) => {
  try {
    const { thread_id } = req.body;

    const result = await ThreadModel.deleteThreadByThreadId(thread_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Thread not found" });
    }

    res.status(200).json({ message: "Thread deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
