require('dotenv').config()
const User = require('./Schema')
const { connect } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const Signup = async (req, res) => {
    const { username, password, email, re_enter_password } = req.body;
   
    if (!username || !password || !email || !re_enter_password) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }
    else if (password !== re_enter_password) {
        res.json({
            message: "Password & Re-type Password not match "
        })
    }
    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("Signup DB connected")

            const userExist = await User.exists({ email: email })
            if (userExist) {
                res.json({  
                    message: "User already exist"
                })
            }
            else {
                await User.create({ username, email, password: await hash(password, 12) })

                console.log(" User Created")

                res.status(201).json(
                    {
                        message: "SignUP SucessFully"
                    }
                )
            }

        } catch (error) {
            res.json(
                {
                    message: error.message
                }
            )
        }
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("Login DB connected")

            const checkuserExist = await User.findOne({ email: email })

            if (!checkuserExist) {
                res.json(
                    {
                        message: "User Does not Exist"
                    }
                )
            }
            else {
                const decrypPassword = await compare(password, checkuserExist.password)
                console.log(decrypPassword)

                if (email == checkuserExist.email && decrypPassword) {

                    const token = sign(
                        {
                            id: checkuserExist._id,
                            username: checkuserExist.username,
                            email: checkuserExist.email                            
                        }
                        ,
                        process.env.JWT_SECRET
                    )
                    res.status(200).json(
                        {
                            message: "Sucessfully Login",
                            token: token
                        }
                    )
                }
                else {
                    res.json(
                        {
                            message: "Invalid Credentials"
                        }
                    )
                }
            }
        }

        catch (error) {
            res.status(404).json(
                {
                    message: error.message
                }
            )
        }
    }
}

module.exports = { Login, Signup}