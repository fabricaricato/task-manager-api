import {connect} from "mongoose";
import { config } from "dotenv"
config()

const URI_DB = process.env.URI_DB

const connectDb = async () => {
  try {
    await connect(URI_DB)
    console.log("=== 👌 SERVIDOR CONECTADO CORRECTAMENTE 👌 ===")
  } catch (error) {
    console.log("=== No se pudo conectar con el servidor :c ===")
  }
}

export {connectDb}