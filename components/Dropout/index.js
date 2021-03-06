import React from "react";
import { useForm } from "react-hook-form";

export default (props) => {
  const { socket } = props;
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    data.rate = parseFloat(data.rate);
    socket.emit("addDropout", data);
  };

  return (
    <div className="col border p-3 border-dark rounded-lg bg-light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Dropout</legend>
          <div class="form-group">
            <fieldset>
              <label class="control-label" for="rate">
                Rate
              </label>
              <input
                class={`form-control ${errors.rate && "is-invalid"}`}
                id="rate"
                name="rate"
                type="number"
                placeholder="Rate"
                step="0.01"
                ref={register({ required: true, min: 0, max: 1 })}
              />

              {errors.rate && (
                <div class="invalid-feedback">
                  Please select the rate between 0 and 1
                </div>
              )}
            </fieldset>
          </div>

          <button type="submit" class="btn btn-secondary btn-block">
            Add Dropout
          </button>
        </fieldset>
      </form>
    </div>
  );
};
