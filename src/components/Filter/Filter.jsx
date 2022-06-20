import React, { Component } from 'react';
import './Filter.scss';
import PropTypes from 'prop-types';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: 'likes', label: 'by likes' },
        { name: 'rating', label: 'by rating' },
      ],
    };
  }

  render() {
    const { filter, onFilterChange } = this.props;
    const { items } = this.state;
    const buttons = items.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          key={name}
          type="button"
          className={`btn btn-sm ${clazz}`}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      );
    });

    return (
      <div className="filter">
        <h2 className="mb-2">Sort movies</h2>
        <div className="buttons mb-3">
          {buttons}
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
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
