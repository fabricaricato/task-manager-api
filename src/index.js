import { connectDb } from "./config/mongodb.js"
import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { authRouter } from "./router/authRouter.js"
import { taskRouter } from "./router/taskRouter.js"
import { validateJWT } from "./middleware/middleware.js"
config()

const PORT = process.env.PORT

// CONFIGURACIÓN DEL SERVIDOR
const servidor = express()
servidor.use(express.json())
servidor.use(cors())

// ENDPOINTS
servidor.use("/api/auth", validateJWT, authRouter)
servidor.use("/api/tasks", validateJWT, taskRouter)

// CONEXIÓN Y ESCUCHA DEL PUERTO
servidor.listen(PORT, () => {
  connectDb()
  console.log(`=== 👂 Escuchando en el puerto: ${PORT} 👂 ===`)
})