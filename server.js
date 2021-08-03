const express = require("express");
const bodyParser = require("body-parser");
const mySql = require("mysql");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projekat1",
});
connection.connect(function (error) {
  if (error) throw error;
  console.log("Konektovnai ste na bazu");
});

const app = express();
const port = 3000;

app.listen(port, function () {
  console.log("Server je dignut na portu " + port);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.static(__dirname, { index: "index.html" }));

app.post("/form", function (req, res) {                    //DA PROVERIM DA LI JE LOGIN ILI FORM 
  let email = req.body.email;   
  let password = req.body.password;

  connection.query(
    "SELECT  id,mail,uloga from korisnici where mail=? and password=?",
    [email, password],
    function (err, result, field) {
      if (result.length > 0) {
        if (err) throw err;

        res.json({
          result: "OK",
          data: result,
        });
      } else {
        res.json({
          result: "Pogresni kredencijali",
        });
        return;
      }
    }
  );
});
app.post("/form", function (req, res) {
  var name = req.body.name;
  var surname = req.body.surname;
  var email = req.body.email;
  var password = req.body.password;
  var uloga = 0;

  connection.query(
    "Select *  from korisnici where mail=?",
    [email],
    function (err, result, filed) {
      if (result.length > 0) {
        res.json({
          result: "korisnik sa tim emailom postoji",
        });
      } else {
        connection.query(
          "INSERT INTO korisnici(ime,prezime,mail,password,uloga) values(?,?,?,?,?)",
          [name, surname, email, password, uloga],
          function (err, result, field) {
            if (err) throw err;
          }
        );
        res.json({
          result: "Ubacen korisnik",
          data: "ok",
        });
      }
    }
  );
});

app.get("/getListUsers", function (req, res) {
  connection.query(
    "SELECT  id,mail,uloga from korisnici",
    function (err, result, field) {
      if (result.length > 0) {
        if (err) throw err;

        res.json({
          result: "OK",
          data: result,
        });
      } else {
        res.json({
          result: "Greska",
        });
        return;
      }
    }
  );
});

app.delete("/delete", function (req, res) {
  console.log(req);
  let id = req.body.id;
  console.log(id);
  connection.query(
    "DELETE FROM korisnici where id=?",
    [id],
    function (err, result, field) {
      if (err) throw err;

      res.json({
        result: "OK",
      });
      return;
    }
  );
});

