import React from "react";

export default () => (
  <div className="col border p-3 border-info rounded-lg bg-light">
    <form>
      <fieldset>
        <legend>Dense</legend>

        <div class="form-group has-success">
          <label class="form-control-label" for="inputValid">
            Valid input
          </label>
          <input
            type="text"
            value="correct value"
            class="form-control is-valid"
            id="inputValid"
          />
          <div class="valid-feedback">Success! You've done it.</div>
        </div>

        <div class="form-group">
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
        </fieldset>
        <button
          onClick={(e) => e.preventDefault()}
          type="submit"
          class="btn btn-info btn-block"
        >
          Add Dense
        </button>
      </fieldset>
    </form>
  </div>
);
