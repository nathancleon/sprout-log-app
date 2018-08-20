const jwt = require('jsonwebtoken');

exports.verifyToken = function(req, res, next) {
  const token = req.params.token;

  if (!token) {
    res.status(401).json({
      message: 'no token provided'
    });

    return;
  }

  jwt.verify(token, '123', (err, user) => {
    if (err) {
      res.status(401).json({
        message: 'token is invalid'
      });
      return;
    }
    req.user = user;
    next();
  })

};

