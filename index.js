// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  //app.get("/api/:date?", (req, res) => {
  let dateWert = req.params.date;
  console.log(req.params);
  let date = new Date(dateWert);

  if (!dateWert) {//wenn nicht gesetzt, dann neues objekt erstellen
    console.log("date nicht gesetzt");
    date = new Date();
  }else{
    //wenn eine nummer übergeben wurde (ganz umständlich)
    let intWErt = parseInt(dateWert);
     if(intWErt.toString().length == dateWert.length){
       console.log ("Datum ist nummer")
       date = new Date(intWErt);
     }else{
       date = new Date(dateWert); //sonst die funktion die arbeit machen lassen
       if (date == "Invalid Date"){
          return res.json({ error: "Invalid Date" });// wenn ungültig
       }
      // console.log("xx ", date)
     }
  }

  console.log("mein date", date)
  
  

 
  const unixWert = date.getTime(); //unix zeitstempel
  const utcWert = date.toUTCString(); //utc

  //console.log("Meine Antwort", unixWert, utcWert);
  return res.json({ unix: unixWert, utc: utcWert });
  
  
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
