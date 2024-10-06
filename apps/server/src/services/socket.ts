import { Server, Socket } from "socket.io";
import Redis from "ioredis";

const redisConnectionConfig = {
  host: "127.0.0.1",
  port: 6379,
};

const pub = new Redis(redisConnectionConfig);

pub.on("connect", () => console.log("PUB connected"));

const sub = new Redis(redisConnectionConfig);

class SocketService {
  private _io: Server;
  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    sub.subscribe("MESSAGES");
  }

  get io() {
    return this._io;
  }

  initListeners() {
    const io = this.io;
    console.log("Init Socket Listeners... ");

    io.on("connect", (socket: Socket) => {
      console.log("Socket Connected:  ", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        //public message from here
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        console.log("New Message From redis");

        io.emit("message", message);
      }
    });
  }
}

export default SocketService;
