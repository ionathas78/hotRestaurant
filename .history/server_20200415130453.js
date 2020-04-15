const express = require("express");
const path = require("path");
const PORT = 7700;

const app = new express();

const reservations = [];

const SeatingTypes = {
    UNDEFINED = 0,
    BAR = 1,
    TABLE = 2,
    BOOTH = 3,
    PATIO = 4,
    length = 5
};
Object.freeze(seatingTypes);

class Reservation {
    constructor (name, partyCount, seatingPreference = SeatingTypes.UNDEFINED) {
        this.name = name;
        this.partyCount = partyCount;
        this.seatingPreference = SeatingTypes.UNDEFINED;
        if (seatingPreference > -1 && seatingPreference < SeatingTypes.length) {
            this.seatingPreference = seatingPreference;
        };
    };

    toJSON() {
        return JSON.stringify(this);
    };
};



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  // Displays all characters
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  // Displays a single character, or returns false
  app.get("/api/reserve", function(req, res) {
      return 
    var chosen = req.params.character;
  
    console.log(chosen);
  
    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New Characters - takes in JSON input
  app.post("/api/characters", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newcharacter = req.body;
  
    console.log(newcharacter);
  
    // We then add the json the user sent to the character array
    characters.push(newcharacter);
  
    // We then display the JSON to the users
    res.json(newcharacter);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  