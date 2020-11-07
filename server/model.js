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
        kernelInitializer: "heUniform",
      })
    );
  }

  addConv(data) {
    this.model.add(tf.layers.conv2d(data));
  }

  addMaxPooling(data) {
    this.model.add(tf.layers.maxPooling2d(data));
  }

  addFlatten(data) {
    this.model.add(tf.layers.flatten(data));
  }

  addDense(data) {
    this.model.add(tf.layers.dense(data));
  }

  addDropout(data) {
    this.model.add(tf.layers.dropout(data));
  }

  compileModel(data) {
    this.model.compile(data);
  }

  getModel() {
    return this.model;
  }
}

module.exports = {
  Model,
};
