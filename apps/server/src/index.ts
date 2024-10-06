import http from "http";
import SocketService from "./services/socket";

async function init() {
  const httpServer = http.createServer();

  const socketService = new SocketService();

  const PORT = process.env?.PORT ?? 8000;

  //attaching http-server to socket to listen the event
  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () =>
    console.log(`-> Server started on PORT: ${PORT}`)
  );

  socketService.initListeners();
}

init();
