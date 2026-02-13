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
    req.session.user_id = user.id;
    console.log('LOGGED IN - ID = ' + user.id);

    return res.json({
      id: user.id,
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
