var mysql = require("mysql");
const QueryFunctions = require("./queryFunctions.cjs");
var databaseConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});
databaseConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//===============================================================
const cors = require("cors"); // Import the cors package
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { error } = require("console");
const app = express();
const port = process.env.PORT || 3000;
//=========================================================
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

//Serve static files (including the HTML form)
app.use(express.static(path.join(__dirname, "dist")));

//==============================================================

app.post("/api/yourEndpoint", (req, res) => {
  const receivedData = req.body;
  // Process the received data, e.g., save it to the database
  console.log("Received data:", receivedData);
  res.status(200).json({ message: "Data received successfully" });
});
//==============================================================
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  function authentication_callback(error, result) {
    if (error) {
      return;
    }
    console.log(username, password, result);

    if (result[0]) {
      // Mocking authentication with a simple message
      res.status(200).json({ message: "Login successful", username: username });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  }
  QueryFunctions.getAuthenticated(
    username,
    password,
    databaseConnection,
    authentication_callback
  );
});
//===========================================================

app.post("/getListOfAllStudents", (req, res) => {
  try {
    function callbackFor_getListOfAllStudents(error, listOfAllStudents) {
      if (error) {
        console.log(error);
        return;
      }
      res.status(200).json({ message: JSON.stringify(listOfAllStudents) });
    }
    QueryFunctions.getListOfAllStudents(
      databaseConnection,
      callbackFor_getListOfAllStudents
    );
  } catch (error) {
    var errorMessage = `<body><h2>Error getting list of all students</br>${error}</h2></body>`;
    res.status(500);
    res.send(errorMessage);
  }
});

app.post("/updateDatabase", (req, res) => {
  try {
    const receivedData = req.body;
    var studentID = receivedData.id;
    console.log("Received data:", receivedData);
    QueryFunctions.updateEntryById(
      { key: receivedData.key, value: receivedData.value, id: receivedData.id },
      databaseConnection
    );
    res.status(200).json({ message: "Data received successfully" });
  } catch (error) {
    errorMessage = `<body><h2>Error updating database</br>${error}</h2></body>`;
    res.status(500);
    res.send(errorMessage);
  }
});

app.post("/sortByClass", (req, res) => {
  try {
    const receivedData = req.body;
    function callbackFor_getListOfStudentsForClass(error, list) {
      if (error) {
        console.log(error);
        return;
      }
      //The student list is being sent from hear
      res.status(200).json({ message: JSON.stringify(list) });
    }
    QueryFunctions.getListOfStudentsForClass(
      receivedData.value,
      databaseConnection,
      callbackFor_getListOfStudentsForClass
    );
  } catch (error) {
    errorMessage = `<body><h2>Error sorting by class </br>${error}</h2></body>`;
    res.status(500);
    res.send(errorMessage);
  }
});

app.post("/removeById", (req, res) => {
  try {
    QueryFunctions.deleteEntry(req.body.value, databaseConnection);
    res.status(200).json({ message: "id :" + req.body.value + "  removed" });
  } catch (error) {
    errorMessage = `<body><h2>Error in removing by Id </br>${error}</h2></body>`;
    res.status(500);
    res.send(errorMessage);
  }
});

app.post("/createNewEntry", (req, res) => {
  try {
    QueryFunctions.getEntryById(
      req.body.id,
      databaseConnection,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error in creating new entry");
          return;
        }
        if (result) {
          res
            .status(400)
            .send(
              "An entry with the same ID already exists. ID needs to be unique."
            );
          return;
        } else {
          QueryFunctions.createNewEntry(
            req.body.name,
            req.body.id,
            req.body.grade,
            req.body.gpa,
            databaseConnection
          );
          res.status(200).send("New entry created successfully.");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in creating new entry");
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
//==========================================================
