import React from "react";
import { useForm } from "react-hook-form";

const padding = ["valid", "same", "causal"];
const activation = [
  "elu",
  "hardSigmoid",
  "linear",
  "relu",
  "relu6",
  "selu",
  "sigmoid",
  "softmax",
  "softplus",
  "softsign",
  "tanh",
];
const kernelInitializer = [
  "glorotNormal",
  "glorotUniform",
  "heNormal",
  "heUniform",
  "leCunNormal",
  "leCunUniform",
  "ones",
  "zeros",
];

export default (props) => {
  const { socket } = props;
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    data.kernelSize = parseInt(data.kernelSize);
    data.filters = parseInt(data.filters);
    data.strides = parseInt(data.strides);

    socket.emit("addConv", data);
  };

  return (
    <div className="col border p-3 border-primary rounded-lg bg-light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Conv 2D</legend>
          <div class="form-group">
            <fieldset>
              <label class="control-label" for="filters">
                Filter Size
              </label>
              <input
                class={`form-control ${errors.filters && "is-invalid"}`}
                id="filters"
                name="filters"
                type="number"
                placeholder="Filter Size"
                ref={register({ required: true, min: 1 })}
              />

              {errors.filters && (
                <div class="invalid-feedback">
                  Please select filter size more than 0
                </div>
              )}
            </fieldset>
          </div>

          <div class="form-group">
            <fieldset>
              <label class="control-label" for="kernelSize">
                Kernel Size
              </label>
              <input
                class={`form-control ${errors.kernelSize && "is-invalid"}`}
                id="kernelSize"
                name="kernelSize"
                type="number"
                placeholder="Kernel Size"
                ref={register({ required: true, min: 1 })}
              />
              {errors.kernelSize && (
                <div class="invalid-feedback">
                  Please select kernel size more than 0
                </div>
              )}
            </fieldset>
          </div>

          <div class="form-group">
            <fieldset>
              <label class="control-label" for="strides">
                Strides
              </label>
              <input
                class={`form-control ${errors.strides && "is-invalid"}`}
                id="strides"
                name="strides"
                type="number"
                placeholder="Strides"
                ref={register({ required: true, min: 1 })}
              />
              {errors.strides && (
                <div class="invalid-feedback">
                  Please select stride more than 0
                </div>
              )}
            </fieldset>
          </div>

          <div class="form-group">
            <label for="padding">Padding mode</label>
            <select
              class="form-control"
              id="padding"
              name="padding"
              ref={register}
            >
              {padding.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>

          <div class="form-group">
            <label for="activation">Activation Function</label>
            <select
              class="form-control"
              id="activation"
              name="activation"
              ref={register}
            >
              {activation.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>

          <div class="form-group">
            <label for="kernelInitializer">Kernel Initializer</label>
            <select
              class="form-control"
              id="kernelInitializer"
              name="kernelInitializer"
              ref={register}
            >
              {kernelInitializer.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            Add Conv2D
          </button>
        </fieldset>
      </form>
    </div>
  );
};
