const tf = require("@tensorflow/tfjs-node");

class Model {
  constructor() {
    this.model = tf.sequential();
    this.model.add(
      tf.layers.conv2d({
        inputShape: [28, 28, 1],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: "relu",
        kernelInitializer: "varianceScaling",
      })
    );
  }

  addConv() {
    this.model.add(
      tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: "relu",
        kernelInitializer: "varianceScaling",
      })
    );
  }

  addMaxPooling() {
    this.model.add(
      tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2],
      })
    );
  }

  addFlatten() {
    this.model.add(tf.layers.flatten());
  }

  addDense() {
    this.model.add(
      tf.layers.dense({
        units: 10,
        kernelInitializer: "varianceScaling",
        activation: "softmax",
      })
    );
  }

  compileModel() {
    this.model.compile({
      optimizer: tf.train.adam(),
      loss: "categoricalCrossentropy",
    });
  }

  getModel() {
    return this.model;
  }
}

module.exports = {
  Model,
};
