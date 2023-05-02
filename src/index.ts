/* eslint-disable indent */
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import app from "./App";
import Constants from "./constant/constants";
import cluster from "cluster";
import { cpus } from "os";
import { Server } from "socket.io";

// const noOfCpus: number = cpus().length;

// if (cluster.isPrimary) {
//   for (let i = 0; i < noOfCpus; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
  const httpServer = app.listen(Constants.PORT, () => {
    return console.log(`server is listening on ${Constants.PORT}`);
  });
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket: any) => {
    console.log("new connection made.");
    socket.on("join", function (data: any) {
      socket.join(data.room);

      console.log(data.user + "joined the room : " + data.room);

      socket.broadcast.to(data.room).emit("new user joined", {
        user: data.user,
        message: "has joined this room.",
      });
    });

    socket.on("leave", function (data: any) {
      console.log(data.user + "left the room : " + data.room);
      socket.broadcast.to(data.room).emit("left room", {
        user: data.user,
        message: "has left this room.",
      });
      socket.leave(data.room);
    });

    socket.on("message", (data: any) => {
      io.in(data.room).emit("new message", {
        user: data.user,
        message: data.message,
      });
    });
  });

  console.log(`Worker ${process.pid} started`);
// }
