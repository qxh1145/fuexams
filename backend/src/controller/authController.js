import express from "express";
import bcrypt from "bcrypt";
import User from "../model/Users.js";
import jwt from "jsonwebtoken";
import Session from "../model/Session.js";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstname, lastname } = req.body;

    if (!username || !password || !email || !firstname || !lastname) {
      return res.status(400).json({ message: "Please input all infomation" });
    }

    //kiem tra xem user ton tai chua
    const duplicate = await User.findOne({ username });

    if (duplicate) {
      return res.status(409).json("username is already existed");
    }

    //ma ho pass
    console.log(
      "Password nhận được:",
      password,
      "Kiểu dữ liệu:",
      typeof password
    );
    const hashedPassword = await bcrypt.hash(password, 10); //salt = 10

    //tao user moi

    await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${firstname} ${lastname}`,
    });

    //return
    return res.status(201).json({message: "Successfully created"});
  } catch (error) {
    console.log(`Loi khi goi signup`, error);
    res.status(500).json({ message: "loi he thong" });
  }
};

export const signOut = async (req, res) => {
  try {
    //lay refresh token tu cookie
    const token = req.cookies?.refreshToken;

    //xoa refresh token trong session
    if (token) {
      await Session.deleteOne({ refreshToken: token });

      //xoa cookie
      res.clearCookie("refreshToken");
      
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log("Error at signOut function ", error);
    return res.status(500).json({ message: "error while sign out" });
  }
};

export const signIn = async (req, res) => {
  try {
    //lay input tu body
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please in put username and password" });
    }

    //lay hash password de so sanh voi password

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Incorrect username or password" });
    }

    //kiem tra pass

    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    //neu dung tao access voi jwt
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    // tao refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    await Session.deleteMany({ userId: user._id }); //xoa user trung lap de tra ve access token moi

    //tao session de lu refresh token
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });
    //tra refresh token ve trong cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL,
    });
    //tra access token ve trong res
    return res.status(200).json({
      message: `User ${user.displayName} have logged in`,
      accessToken,
      user
    });
  } catch (error) {
    console.log("Error in sign in ", error);
    return res.status(500).json({ message: "Sign in internal error " });
  }
};

