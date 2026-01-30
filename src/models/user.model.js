import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Nuevo usuario",
    trim: true // Según la IA, elimina espacios vacios
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
  { versionKey: false }
)

const User = mongoose.model("User", UserSchema)

export { User }