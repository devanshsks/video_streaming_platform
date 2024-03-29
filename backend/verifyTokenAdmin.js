import jwt from "jsonwebtoken";

function verify(req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        // const userArray = User.find({ _id: user.id });
        // if (userArray.isAdmin) {
          req.user = user;
          next();
        // } else {
        //   res.status(403).json("You are not an admin!");
        // }
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  }
  
  export default verify;