import jwt, { decode } from "jsonwebtoken";
import User from "../model/Users.js";

export const protectedRoute = (req, res, next) => {
  try {
    //lay access token tu header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //bearer <token>

    if (!token) {
      return res.status(401).json({ message: "cannot find  token" });
    }
    //xac nhan token hop le
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          console.log(err);

          return res
            .status(403)
            .json({ message: "Access token expire or incorrect" });
        }
        //tim user
        const user = await User.findById(decodedUser.userId).select('-hashedPassword');

        if(!user) {
            return res.status(404).json({message: "cannot find user"})
        }

        req.user = user;
        next()
        
      }
    );
  } catch (error) {
    console.log("Error while verify user ", error);
    return res.status(500).json({ message: "can not verify user" });
  }
};
