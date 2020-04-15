const express = require("express");
const path = require("path");
const PORT = 7700;

const app = new express();

const _reservations = [];
const _ticketNumber = -1;

const SeatingTypes = {
    UNDEFINED: 0,
    BAR: 1,
    TABLE: 2,
    BOOTH: 3,
    PATIO: 4,
    length: 5
};
Object.freeze(SeatingTypes);

class Reservation {
    constructor (name, partyCount, seatingPreference = SeatingTypes.UNDEFINED, ticketNumber = -1) {
        this.name = name;
        this.partyCount = partyCount;
        this.seatingPreference = SeatingTypes.UNDEFINED;
        if (seatingPreference > -1 && seatingPreference < SeatingTypes.length) {
            this.seatingPreference = seatingPreference;
        };
        this.ticketNumber = ticketNumber;
        if (ticketNumber < _ticketNumber) {
            _ticketNumber++;
            this.ticketNumber = _ticketNumber
        };
    };

    toJSON() {
        return JSON.stringify(this);
    };

    toString() {
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
  app.get("/api/_reservations", function(req, res) {
      return _reservations;
  });

  app.get("/api/reservations/ticketnumber", function(req, res) {
    return _ticketNumber + 1;
  });
  
  app.get("/api/_reservations/:name", function(req, res) {

    var chosen = req.params.name;
  
    console.log(chosen);
  
    for (var i = 0; i < _reservations.length; i++) {
      if (chosen === _reservations[i].name) {
        return res.json(_reservations[i]);
      }
    }
  
    return res.json(false);
  });

  // Create New Characters - takes in JSON input
  app.post("/api/_reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = new Reservation(req.body.name, req.body.partyCount, req.body.seatingPreference);
  
    console.log(newReservation.toJSON());
  
    // We then add the json the user sent to the character array
    characters.push(newReservation);
  
    // We then display the JSON to the users
    res.json(newReservation);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  