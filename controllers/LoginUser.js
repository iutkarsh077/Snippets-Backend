import bcrypt from "bcryptjs";
import prisma from "../prisma/index.js";
import jwt from "jsonwebtoken"

export async function LoginUser(req, res){
    const {email, password} = await req.body;


    if(!email || !password){
        return res.status(401).json({msg: "Please fill the required fields", status: false})
    }
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                verified: true,
                password :true,
                id: true
            }
        })

        if(!findUser){
            return res.status(401).json({msg: "User does not exist", status: false})
        }

        if(findUser.verified === false){
            return res.status(401).json({msg: "Please verify before login", status: false})
        }

        const isPasswordMatch = await bcrypt.compare(password, findUser.password);
    
        if(!isPasswordMatch){
            return res.status(401).json({msg: "Wrong Credentials", status: false})
        }

        const token = jwt.sign(
            { id: findUser.id }, 
            process.env.JWT_SECRET,
            { expiresIn: "15d" } 
          );
      
          res.cookie("snippets", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "None", 
            maxAge: 24 * 60 * 60 * 1000 * 15, 
            domain: "http://localhost:4173"
          });

        return res.status(200).json({msg: "LoggedIn successfully", status: true})
    } catch (error) {
        return res.status(500).json({msg: "Internal server error", status: false})
    }
}