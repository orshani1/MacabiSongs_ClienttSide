require("dotenv").config('app/.env');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Song = require("./models/song");
var cors = require("cors");
const { ObjectUnsubscribedError } = require("rxjs");
const User = require("./models/user");
const Quote = require("./models/quote");

const port = process.env.PORT || 3000;


async function handleCors(req, res, callback) {


  await res.setHeader('Access-Control-Allow-Origin', '*')
  await res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
  await res.setHeader('Access-Control-Allow-Headers', 'Authorization');
  

  // CORS OPTIONS request, simply return 200
  if (req.method == 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      callback.onOptions();
      return;
  }

callback.onContinue();
}
app.use(cors());





app.use(express.static("app"));

async function connectToDb() {

  try
  {

  const client = await mongoose.connect("mongodb://localhost/macabi-songs",{ useUnifiedTopology: true, useNewUrlParser: true });     
   let db = await mongoose.connection;
      db.on('error', (e) => console.error(e));
     db.once('open', () => console.log("connected to db"));
     return client;

    }
    catch(err){
        console.log(err);
    }
  }

  async function main(){
    const db = await connectToDb();
    console.log('db is ',db);
    app.use(express.urlencoded({ extended: true }));

app.use(express.json());

///GET ALL SONGS
///GET ALL SONGS
///GET ALL SONGS
///GET ALL SONGS

app.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
///GET ALL SONGS
///GET ALL SONGS
///GET ALL SONGS
//.........................
///GET_SINGLE SONG
///GET_SINGLE SONG
///GET_SINGLE SONG
app.get("/songs/:id", async (req, res) => {
  const resp = await Song.findById(req.params.id);
  if (!resp) {
    res.status(404).send("not found");
  } else {
    res.json(resp);
  }
});
///GET_SINGLE SONG
///GET_SINGLE SONG
///GET_SINGLE SONG
//.........................
///POST_SONG
///POST_SONG
///POST_SONG
app.post("/songs", async (req, res) => {
  const song = new Song({
    title: req.body.title,
    words: req.body.words,
    isSelected: req.body.isSelected,
    subWords: req.body.subWords,
    video: req.body.video,
  });
  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.send({ message: err });
  }
});

///POST_SONG
///POST_SONG
///POST_SONG

//.........................
///DELETE_SONG
///DELETE_SONG
app.delete("/songs/:id", async (req, res) => {
  deletedSong = await Song.deleteOne({ _id: req.params.id });
  res.send({ message: "deleted" });
});
///DELETE_SONG
///DELETE_SONG
//.........................

///UPDATE
///UPDATE
///UPDATE

app.patch("/songs/:id", async (req, res) => {
  let filter = { _id: req.params.id };
  let update = {
    title: req.body.title,
    words: req.body.words,
    subWords: req.body.subWords,
    video: req.body.video,
    isSelected: req.body.isSelected,
  };

  await Song.findOneAndUpdate(filter, update, { new: true });
  res.json(update);
});
///UPDATE
///UPDATE
///UPDATE

////SONGS HTTP REQ
////SONGS HTTP REQ
////SONGS HTTP REQ
////SONGS HTTP REQ

////USERS HTTP REQ
////USERS HTTP REQ
app.get("/users", async (req, res) => {
  console.log('Enter users');
  await handleCors();
  const users = await User.find();
  console.log(users);
  res.json(users);
});
////USERS HTTP REQ
////USERS HTTP REQ

app.get("/quotes", async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
});
app.listen(port, () => console.log("server started"));

  }
main();
