import { User } from "../models/user.model.js"
import bcrypt, { compare } from "bcryptjs";
// import jwt from "jsonwebtoken"

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({success: false, error: "debe completar todos los campos para poder registrarse"})
    }

    if (!emailRegex.test(email) || (!email.endsWith(".com"))) {
      return res.status(400).json({success: false, error: "debe ingresar un mail valido"})
    }

    if (password.length < 4) {
      return res.status(400).json({ success: false, error: "la contraseña debe contar al menos con 5 caracteres" })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: passwordHash
    })

    return res.status(200).json({success: true, data: newUser})

  } catch (error) {
    return res.status(400).json({success: false, error: error.message}
    )
  }
}

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const foundUser = await User.findOne({ email })

    const comparePasswords = await bcrypt.compare(password, foundUser.password)

    if (!comparePasswords) {
      return res.status(401).json({success: false, error: "no autorizado, intentelo nuevamente"})
    }

    return res.status(200).json({success: true, data: "autenticación exitosa!"})

  } catch (error) {
    return res.status(400).json({success: false, error: error.message})
  }
}

export {register, login}