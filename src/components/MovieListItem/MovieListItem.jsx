import React, { Component } from 'react';
import './MovieListItem.scss';

// eslint-disable-next-line react/prefer-stateless-function
class MovieListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types
      title: props.data.title,
    };
  }

  render() {
    const { title } = this.state;
    return (
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
          <h3 className="card-title">{title}</h3>
        </div>
      </div>
    );
  }
}

export default MovieListItem;
