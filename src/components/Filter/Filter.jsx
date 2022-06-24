import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Filter.scss';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { searchInputValue } = this.state;
    const { onSearch } = this.props;
    onSearch(searchInputValue);
    this.setState(({ searchInputValue: '' }));
  };

  onInputChange = (event) => {
    this.setState(({ searchInputValue: event.target.value }));
  };

  render() {
    const { filters, activeFilter, onFilterChange } = this.props;
    const { searchInputValue } = this.state;
    const buttons = filters.map(({ name, label }) => {
      const isActive = activeFilter === name;
      const filterButtonClass = isActive ? 'btn-primary' : 'btn-outline-secondary';
      return (
        <button
          key={name}
          type="button"
          className={`btn btn-sm ${filterButtonClass}`}
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
        <form
          onSubmit={this.onSubmit}
          className="input-group mb-3"
        >
          <button type="button" className="btn btn-outline-secondary">
            <i className="fa fa-search" />
          </button>
          <input
            onChange={this.onInputChange}
            value={searchInputValue}
            className="form-control"
            type="text"
            placeholder="Search by name"
          />
        </form>
      </div>
    );
  }
}

Filter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Filter;
