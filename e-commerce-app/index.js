//const express = require("express")
import express from "express"
import dotenv from "dotenv"
import i18next from "i18next"
import backend from "i18next-fs-backend"
import middleware from "i18next-http-middleware"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import categoryRouter from "./routes/category.routes.js"
import authRouter from "./routes/auth.routes.js"
import { authMiddleware } from "./middleware/auth.middleware.js"

const app = express()

dotenv.config()
const PORT = process.env.PORT
const API = process.env.API

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend:{
      loadPath: "locales/{{lng}}.json"
    }
  })
    

app.use(express.json())
app.use(cors({
    origion: ["htp://localhost:3000", "https://project01-nodejs.onrender.com"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"]
}))
app.use(middleware.handle(i18next))
app.use(morgan("combined"))
app.get(`${API}/health`, (req, res) => {
    res.send(req.t("validationFailed"))    
})
app.use(authMiddleware)
app.use(`${API}/categories`, categoryRouter)
app.use(`${API}/auth`, authRouter)

app.listen(PORT, ()=> {

    console.log(`Server is running at http://localhost:${PORT}}`)

})


const connectionString = process.env.CONNECT_STRING;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to Mongo DB ^_^"))
  .catch((error) => log(error));