import React from "react";
import _ from "lodash/fp";
import { useForm } from "react-hook-form";

const padding = ["valid", "same", "causal"];
const dataFormat = ["channelsFirst", "channelsLast"];

export default (props) => {
  const { socket } = props;
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <div className="col border p-3 border-warning rounded-lg bg-light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Max Pooling 2D</legend>
          <div class="form-group">
            <fieldset>
              <label class="control-label" for="poolSize">
                Pool Size
              </label>
              <input
                class={`form-control ${errors.poolSize && "is-invalid"}`}
                id="poolSize"
                name="poolSize"
                type="number"
                placeholder="Pool Size"
                ref={register({ required: true, min: 1, max: 99 })}
              />

              {errors.poolSize && (
                <div class="invalid-feedback">
                  Please select pool size size more than 0
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
                placeholder="Kernel Size"
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
            <label for="dataFormat">Data Format</label>
            <select
              class="form-control"
              id="dataFormat"
              name="dataFormat"
              ref={register}
            >
              {dataFormat.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>

          <button type="submit" class="btn btn-warning btn-block">
            Add Max Pooling
          </button>
        </fieldset>
      </form>
    </div>
  );
};
