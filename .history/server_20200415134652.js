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
        this.routeName = name.replace(/ /g,"").toLowerCase() + "_" + partyCount
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
        jsonThis = {
            routeName = this.routeName,
            name: this.name,
            partyCount: this.partyCount,
            seatingPreference: this.seatingPreference,
            ticketNumber: this.ticketNumber
        };

        return JSON.stringify(jsonThis);
    };

    toString() {
        return this.toJSON();
    };
};



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  app.get("/api/reservations", function(req, res) {
      return _reservations;
  });

  app.get("/api/ticketnumber", function(req, res) {
    return _ticketNumber + 1;
  });
  
  app.get("/api/reservations/:name", function(req, res) {

    var chosen = req.params.name;
  
    console.log(chosen);
  
    for (var i = 0; i < _reservations.length; i++) {
      if (chosen === _reservations[i].name) {
        return res.json(_reservations[i]);
      }
    }
  
    return res.json(false);
  });

  app.post("/api/reservations", function(req, res) {
    var newReservation = new Reservation(req.body.name, req.body.partyCount, req.body.seatingPreference);
  
    console.log(newReservation.toJSON());
  
    characters.push(newReservation);
  
    res.json(newReservation);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  