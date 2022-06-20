import React from 'react';
import './Filter.scss';

function Filter() {
  return (
    <div className="filter">
      <h2 className="mb-2">Sort movies</h2>
      <div className="buttons mb-3">
        <button type="button" className="btn btn-outline-dark btn-sm">
          by likes
        </button>
        <button type="button" className="btn btn-outline-dark btn-sm">
          by names
        </button>
      </div>
      <div className="input-group mb-3">
        <button type="button" className="btn btn-outline-secondary">
          <i className="fa fa-search" />
        </button>
        <input
          className="form-control"
          type="text"
          placeholder="Search by name"
        />
      </div>
    </div>
  );
}

export default Filter;
