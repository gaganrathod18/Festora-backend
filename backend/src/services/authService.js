import User from "../models/User";
import generateToken from "../utils/generateToken";


const registerUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email })
    if (existingUser)
        throw new Error("User already exist");

    const user = await User.create({name, email, password, role})
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    }
}


const loginUser = async ({ email, password }) => {
    const user = User.findOne({ email }).select("+password")

    if (!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid email or password");
    }
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    }
}


const getMe = async (userId) => {
    const user = User.findOne({ email }).select("+password")

    if (!user || !(await user.comparePassword(password))) {
        throw new Error("User not found");
    }
    return user;
}

export { registerUser, loginUser, getMe };