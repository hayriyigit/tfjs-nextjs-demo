import React from "react";
import { useForm } from "react-hook-form";

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
  "constant",
  "glorotNormal",
  "glorotUniform",
  "heNormal",
  "heUniform",
  "identity",
  "leCunNormal",
  "leCunUniform",
  "ones",
  "orthogonal",
  "randomNormal",
  "randomUniform",
  "truncatedNormal",
  "varianceScaling",
  "zeros",
];

export default (props) => {
  const { socket } = props;
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <div className="col border p-3 border-info rounded-lg bg-light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Dense</legend>
          <div class="form-group">
            <fieldset>
              <label class="control-label" for="units">
                Units
              </label>
              <input
                class={`form-control ${errors.filters && "is-invalid"}`}
                id="units"
                name="units"
                type="number"
                placeholder="Units"
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

          <button type="submit" class="btn btn-info btn-block">
            Add Dense
          </button>
        </fieldset>
      </form>
    </div>
  );
};
