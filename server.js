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
        return {
            routeName: this.routeName,
            name: this.name,
            partyCount: this.partyCount,
            seatingPreference: this.seatingPreference,
            ticketNumber: this.ticketNumber
        };
    };

    toString() {
        return JSON.stringify(this.toJSON());
    };
};



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Routing

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/Images/soup", function(req, res) {   
    res.sendFile(path.join(__dirname, "/Images/ella-olsson-fxJTl_gDh28-unsplash.jpg"));
});

app.get("/reserve", function(req, res) {
res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/reservations", function(req, res) {
    if (_reservations) {
        return _reservations;
    } else {
        return false;
    };
});

app.get("/api/ticketnumber", function(req, res) {
    return _ticketNumber + 1;
});

app.get("/api/reservations/:name", function(req, res) {

    var chosen = req.params.name;

    console.log(chosen);
    const find = _reservations.find(item => item.routeName == chosen);

    if (find) {
        return find;
    } else {
        return false;
    };
});

app.post("/api/reservations", function(req, res) {
    const { name, partyCount, seatingPreference, ticketNumber } = req.body;
    var newReservation = new Reservation(name, partyCount, seatingPreference, ticketNumber);

    console.log(newReservation.toJSON());

    _reservations.push(newReservation);

    res.json(newReservation);
});

app.get("*", function(req, res) {
    console.log(req.url);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});
  