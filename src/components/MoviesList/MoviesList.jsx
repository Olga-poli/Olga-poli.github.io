import React from 'react';
import './MoviesList.scss';

function MoviesList() {
  return (
    <div className="movies-list">
      <div className="card movies-list-item">
        <div className="card-body">
          <div className="buttons-group">
            <button type="button" className="btn btn-light btn-sm">
              <i className="fa fa-thumbs-up" />
            </button>
            <button type="button" className="btn btn-light btn-sm">
              <i className="fa fa-thumbs-down" />
            </button>
          </div>
          <span>likes</span>
          <span>1</span>
          <h3 className="card-title">Titanic</h3>
        </div>
      </div>
    </div>
  );
}

export default MoviesList;
