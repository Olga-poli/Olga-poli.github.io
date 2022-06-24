import React, { Component } from 'react';
import './Filter.scss';
import PropTypes from 'prop-types';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
  }

  onSearch = (e) => {
    e.preventDefault();
    const { term } = this.state;
    const { onSearch } = this.props;
    onSearch(term);
    this.setState(({ term: '' }));
  };

  onInputChange = (e) => {
    this.setState(({ term: e.target.value }));
  };

  render() {
    const { filters, activeFilter, onFilterChange } = this.props;
    const { term } = this.state;
    const buttons = filters.map(({ name, label }) => {
      const isActive = activeFilter === name;
      const clazz = isActive ? 'btn-primary' : 'btn-outline-secondary';
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
        <form
          onSubmit={this.onSearch}
          className="input-group mb-3"
        >
          <button type="button" className="btn btn-outline-secondary">
            <i className="fa fa-search" />
          </button>
          <input
            onChange={this.onInputChange}
            value={term}
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
