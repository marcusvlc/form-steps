var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const validator = require("./validator");

const path = __dirname + "/views/";

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path));

app.get("/registration", function (_req, res) {
  res.sendFile(path + "index.html");
});

app.post("/registration", function (req, res) {
  const errorCode = validator.getErrorOnFields(req.body);

  // Simulate API process delay
  setTimeout(() => {
    if (errorCode)
      return res.status(errorCode).send("Campos não preenchidos corretamente");

    return res.json(req.body);
  }, 2000);
});

app.listen(3000, function () {
  console.log(
    "Aplicação executando na porta 3000, acessar localhost:3000/registration"
  );
});
