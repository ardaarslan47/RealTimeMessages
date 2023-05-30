import express from 'express';
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

let messages = [];

io.on("connection", (socket) => {
  console.log("A user connected.");

  socket.emit("messageList", messages);

  socket.on("sendMessage", (message) => {
    messages.push(message);
    io.emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
