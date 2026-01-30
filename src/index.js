import express from "express"
import cors from "cors"
import { config } from "dotenv"
config()

const PORT = process.env.PORT

// CONFIGURACIÓN DEL SERVIDOR
const servidor = express()
servidor.use(express.json())
servidor.use(cors())