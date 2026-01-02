import {registerUser, loginUser,getMe } from "../services/authService";

const register = async (req, res) => {
    try{
        const user = await registerUser(req.body);
         res.status(201).json(user);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const login = async (req, res) => {
    try{
        const user = await loginUser(req.body);
         res.status(201).json(user);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const me = async (req, res) => {
    try{
        const user = await getMe(req.user._id);
         res.status(201).json(user);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

export {register,login,me};