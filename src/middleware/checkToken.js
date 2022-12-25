const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { id_token } = req.cookies;

  if (id_token) {
    jwt.verify(
      token,
      process.env.SECRET_KEY,
      {
        algorithms: ["HS256"],
        audience: "redux-auth-client",
        issuer: "redux-auth-server",
        maxAge: "7d",
      },
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "ID token is malformed",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      }
    );
  } else {
    return res.status(401).json({
      success: false,
      message: "Auth token is not supplied. You may need to log in.",
    });
  }
};
