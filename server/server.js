require("@tensorflow/tfjs-node");
const { Model } = require("./model");
const model = new Model();

const http = require("http");
const server = http.createServer();
const socketio = require("socket.io");
const io = socketio(server);

const PORT = process.env.PORT || 8001;

server.listen(PORT, () => {
  console.log("Server running...");
});

io.on("connection", (socket) => {
  socket.on("addMaxPooling", async () => {
    model.addMaxPooling();
    console.log("MaxPooling added");
  });

  socket.on("addConv", async () => {
    model.addConv();
    console.log("Conv2D added");
  });

  socket.on("addFlatten", async () => {
    model.addFlatten();
    console.log("Flatten added");
  });

  socket.on("addDense", async () => {
    model.addDense();
    console.log("Dense added");
  });

  socket.on("compileModel", async () => {
    model.compileModel();
    console.log("Model Compiled");
    const modelSummary = model.getModel().summary;
    socket.emit("model", modelSummary);
  });
});

io.on("connect", () => console.log("Connected"));
