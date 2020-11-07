const tf = require("@tensorflow/tfjs-node");
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
  socket.on("addMaxPooling", async (data) => {
    model.addMaxPooling(data);
    console.log("MaxPooling added");
  });

  socket.on("addConv", async (data) => {
    model.addConv(data);
    console.log("Conv2D added");
  });

  socket.on("addFlatten", async (data) => {
    model.addFlatten(data);
    console.log("Flatten added");
  });

  socket.on("addDense", async (data) => {
    model.addDense(data);
    console.log("Dense added");
  });

  socket.on("addDropout", async (data) => {
    model.addDropout(data);
    console.log("Dropout added");
  });

  socket.on("compileModel", async (data) => {
    model.compileModel(data);
    console.log("Model Compiled");
    const modelSummary = model.getModel().summary;
    socket.emit("model", modelSummary);
  });
});

io.on("connect", () => console.log("Connected"));
