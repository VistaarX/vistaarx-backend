const jwt = require("jsonwebtoken");
const profile = require("../models/Profile")


module.exports = (req, res, next) => {
  const authHeader = req.get("authorization");

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      let userId;
      try {
        let decodedToken = jwt.decode(token);
        userId = decodedToken.userId;
      } catch (err) {
        return res
          .status(400)
          .json({ error: "token are expired or incorrect" });
      }

      if(profile.owners.includes(userId)) {
		next();
		}
      } else {
        return res.status(400).json({ error: "Not Loggedin" });
      }
    } else {
      return res.status(400).json({ error: "Not Loggedin" });
    }
  } else {
    return res.status(400).json({ error: "Not Loggedin" });
  }
};
