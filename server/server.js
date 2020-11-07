const tf = require("@tensorflow/tfjs-node");
const { MnistData } = require("./data");
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
    try {
      model.compileModel(data);
      socket.emit("compailed", {
        status: true,
        message: "Model compailed succesfully",
      });
    } catch (e) {
      socket.emit("compailed", {
        status: false,
        message: `Error: ${e.message}`,
      });
    }
  });

  socket.on("trainModel", async (data) => {
    const dataset = new MnistData();

    const {
      trainImages,
      trainLabels,
      testImages,
      testLabels,
    } = await dataset.load();
    trainMax = trainImages.max();
    trainMin = trainImages.min();
    testMax = testImages.max();
    testMin = testImages.min();
    console.log(trainMax);
    const normalizedTrain = trainImages
      .sub(trainMin)
      .div(trainMax.sub(trainMin));
    const normalizedTest = testImages.sub(testMin).div(testMax.sub(testMin));
    const lastModel = model.getModel();

    await lastModel.fit(normalizedTrain, trainLabels, {
      batchSize: data.batchSize,
      epochs: data.epochs,
      shuffle: data.shuffle,
      verbose: 0,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: async (epochs, logs) => {
          socket.emit("onEpochEnd", { epochs, logs });
        },
      },
    });
  });
});

io.on("connect", () => console.log("Connected"));
