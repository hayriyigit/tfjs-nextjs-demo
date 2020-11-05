import { prop } from "lodash/fp";
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
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
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
                ref={register({ required: true, min: 1, max: 99 })}
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
                class={`form-control ${errors.filters && "is-invalid"}`}
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
                class={`form-control ${errors.filters && "is-invalid"}`}
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

          {/* <div class="form-group">
            <label for="exampleSelect1">Example select</label>
            <select class="form-control" id="exampleSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <fieldset class="form-group">
            <legend>Checkboxes</legend>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  checked=""
                />
                Option one is this and that—be sure to include why it's great
              </label>
            </div>
            <div class="form-check disabled">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  disabled=""
                />
                Option two is disabled
              </label>
            </div>
          </fieldset>
          <fieldset class="form-group">
            <legend>Sliders</legend>
            <label for="customRange1">Example range</label>
            <input
              type="range"
              class="custom-range"
              id="customRange1"
              data-slider-min="0"
              data-slider-max="20"
              data-slider-step="1"
            />
          </fieldset> */}
          <button type="submit" class="btn btn-primary btn-block">
            Add Conv2D
          </button>
        </fieldset>
      </form>
    </div>
  );
};
