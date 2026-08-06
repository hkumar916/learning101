const express = require("express")
require("dotenv").config()
const i18next = require("i18next")
const backend = require("i18next-fs-backend")
const middleware = require("i18next-http-middleware")
const mongoose = require("mongoose");

const app = express()

const PORT = process.env.PORT
const API = process.env.API

i18next
    .use(backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: "en",
        backend: {
            loadPath: "locales/{{lag}}.json"
        }
    })
    

app.use(middleware.handle(i18next))

app.get(`${API}/health`, (req, res) => {

    res.send(req.t("validationFailed"))    
})

app.listen(PORT, ()=> {

    console.log(`Server is running at http://localhost:${PORT}}`)

})


const connectionString = process.env.CONNECT_STRING;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to Mongo DB ^_^"))
  .catch((error) => log(error));