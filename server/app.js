require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = process.env.DB_URI;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const connectWithDB = () => {
    mongoose.connect(uri, options, (err, db) => {
      if (err) console.error(err);
      else console.log("database connection")
    })
}
connectWithDB()

// mongoose.connect('mongodb://localhost:27017/notif_desk', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useCreateIndex: true
// }).then(() => console.log("Connected to the database!")).catch((err) => console.log(err));

app.use("/api/post", require("./routes/routes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/com", require("./routes/com"));

if(process.env.NODE_ENV == 'production'){
  app.use(express.static(__dirname+'/dist/'));
  app.get('*', (req,res)=>{
    res.sendFile(__dirname + "/dist/index.html");
  })
}

app.listen(port, () => console.log(`server running at http://localhost:${port}`));