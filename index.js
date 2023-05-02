const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use("/movies", require("./control/MovieAPI"))

app.get("/", (req, res) => {
    res.send("OK");
  });


app.listen(3001, () => {
    console.log("Escutando..")
})