const authService = require("../services/auth.service");


exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await authService.register(username, email, password);

    return res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    if (err.code === "EMAIL_EXISTS") {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const user = await authService.login(email, password);

    //store user id in the session
    req.session.user_id = user.user_id;
    console.log("SESSION AFTER LOGIN: ", req.session);
    console.log('LOGGED IN - ID = ' + user.user_id);

    return res.json({
      id: user.user_id,
      email: user.email
    });
  } catch (err) {
    if (err.code === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Test use only
exports.delete = async (req, res) => {
  const { userId } = req.body;

  try {
    await authService.deleteUser(userId);

    return res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (err) {
    if (err.code === "NOT_FOUND") {
      return res.status(404).json({ message: err.message });
    }

    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
