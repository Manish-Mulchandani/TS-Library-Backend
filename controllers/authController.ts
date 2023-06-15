import {Request, Response} from "express"
import { comparePassword, hashPassword } from "../helpers/authHelper"
import userModel from "../models/userModel"
import JWT from "jsonwebtoken"

export const registerController = async (req:Request,res:Response) => {
    try {
        const {name,email,password} = req.body

        //validations
        if(!name){
            return res.send({error: "Name is required"})
        }
        if(!email){
            return res.send({error: "Email is required"})
        }
        if(!password){
            return res.send({error: "Password is required"})
        }

        //check if user is existing
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: "User is already Registered. Login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({name,email,password:hashedPassword}).save()
        res.status(200).send({
            success:true,
            message: "User registered successfully",
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}

export const loginController = async (req:Request,res:Response) => {
    try {
        const {email, password} = req.body

        //validations
        if(!email){
            return res.send({error: "Email is required"})
        }
        if(!password){
            return res.send({error: "Password is required"})
        }

        // check user
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(400).send({
                success: false,
                message: "Email not registered"
            })
        }

        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }
        // token
        const jwtSecret = process.env.JWT_SECRET!;
        const token = await JWT.sign({_id: user._id}, jwtSecret, {
            expiresIn: "7d"
        });
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                id: user._id
            },
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}