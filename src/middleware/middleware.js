import jwt from "jsonwebtoken"

JWT_SECRET = process.env.JWT_SECRET

const validateJWT = async (req, res, next) => {
  try {
    const token = req.header("x-token")

    console.log("token ---> ", token)

    if (!token) {
      return res.status(401).json({ success: false, error: "there is no token in the request" })
    }

    const verifyJWT = jwt.verify(token, JWT_SECRET)

    console.log("verificacion JWT ---> ", verifyJWT)

    if (!verifyJWT) {
      return res.status(401).json({ success: false, error: "failed token verification" })
    }

    res.status(200).json({success: true, data: "verificación exitosa"})

    next()

  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

export {validateJWT}