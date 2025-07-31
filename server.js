const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const Port = 3000;

//Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

//serve booking.html
app.get("/booking", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "booking.html"));
});

//Handle form submission
app.post("/submit", (req, res) => {
    const bookingData = req.body;
    
    //SAve to a file(optional)
    const dataFile = path.join(__dirname, "bookings.json");
    let bookings = [];

    if (fs.existsSync(dataFile)) {
        bookings = JSON.parse(fs.readFileSync(dataFile));
    }

    bookings.push(bookingData);
    fs.writeFileSync(dataFile, JSON.stringify(bookings, null, 2));

    res.send("Booking received! Thank you");
});

//Start Server
app.listen(Port, () => {
    console.log(`Server running at http://localhost:${Port}`);
});