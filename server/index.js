const express = require("express");
const SerialPort = require("serialport").SerialPort;
const { ReadlineParser } = require("@serialport/parser-readline");
const res = require("express/lib/response");

const app = express();
const port = new SerialPort({ path: "/dev/cu.usbmodem14101", baudRate: 9600 });

let print = false;
let printEs = false;
let printPt = false;

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
parser.on("data", (line) => {
  console.log(line);
  if (print) {
    port.write("1");
    print = false;
  }
});

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.get("/ingles", () => {
  print = true;
  res.send("imprimiendo en ingles");
});

app.get("/portugues", () => {
    printPt = true;
  res.send("imprimiendo en portugues");
});

app.get("/espanol", () => {
    printEs = true;
  res.send("imprimiendo");
});

app.listen(5000, () => {
  console.log("Servidor en el puerto http://localhost:5000");
});
