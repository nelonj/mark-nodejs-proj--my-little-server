import express from "express";
import ponyData from "../data/ponies.json";
import { seasonOneEpisodes } from "./episodes";
import { pickRandom } from "./random";

const app = express();
const serverStartDate = new Date();
let serverHitCount = 0;  // like state: something tracked, that could change
let historyArray: string[] = [];
interface IPony {
  name: string;
  species: string;
  colour: string;
  voice: string;
  element: string;
  cutie_mark: string;
}

let ponyArray: IPony[] = []

app.get("/", (req, res) => {
  historyArray.push(req.originalUrl)
  res.send(
     '<h1> This is the default path - and it isnt very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time </h1>'
  );
});

app.get("/creation-time", (req, res) => {
  historyArray.push(req.originalUrl)
  res.json({
    message: `The server was started at ${serverStartDate.toTimeString()}`,
    utc: serverStartDate.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/current-time", (req, res) => {
  const dateOfRequestHandling = new Date();
  historyArray.push(req.originalUrl)
  res.json({
    message: `The current date is ${dateOfRequestHandling.toTimeString()}`,
    utc: dateOfRequestHandling.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/hits", (req, res) => {
  serverHitCount += 1;
  historyArray.push(req.originalUrl)
  res.json({
    note: "We've registered your hit!",
    currentTotal: serverHitCount,
    countedAsHit: true,
  });
});

app.get("/hits-stealth", (req, res) => {
  historyArray.push(req.originalUrl)
  res.json({
    note: "Oooh, you ninja. We didn't count that hit.",
    currentTotal: serverHitCount,
    countedAsHit: false,
  });
});

app.get("/ponies", (req, res) => {
  historyArray.push(req.originalUrl)
  res.json({
    message: "Loaded dummy JSON data:",
    data: ponyData,
    countedAsHit: false,
  });
});

app.get("/ponies/random", (req, res) => {
  console.log(ponyArray)
  console.log(ponyArray[0])
  let randomPony: IPony;
  let lastPony = ponyArray.pop()
  while (true) {
    randomPony = pickRandom(ponyData.members);
    
    if (randomPony !== lastPony) {
      break
  }}

  ponyArray.push(randomPony);
  serverHitCount += 1;
  historyArray.push(req.originalUrl)
  res.json({
    data: randomPony,
    curretntTotal: serverHitCount
  })

})

app.get("/season-one", (req, res) => {
  historyArray.push(req.originalUrl)
  res.json({
    countedAsHit: false,
    data: seasonOneEpisodes,
  });
});

app.get("/season-one/random", (req, res) => {
  const randomEpisode = pickRandom(seasonOneEpisodes);
  historyArray.push(req.originalUrl)
  res.json({
    countedAsHit: false,
    data: randomEpisode,
  });
});

app.get("/hello-world", (req, res) => {
  historyArray.push(req.originalUrl)
  res.json({
    "english": "Hello world!",
    "esperanto": "Saluton mondo!",
    "hawaiian": "Aloha Honua",
    "turkish": "Merhaba Dünya!"
  })
})

app.get("/history", (req, res) => {
  historyArray.push(req.originalUrl)
  res.json({
    "routes": historyArray
  })
})

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see what comes back by visiting localhost:${PORT_NUMBER} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
