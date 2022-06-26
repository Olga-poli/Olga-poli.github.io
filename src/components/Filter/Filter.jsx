import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import store from '../../store/configureStore';
// import * as actions from '../../store/actions/actions';
import styles from './Filter.module.scss';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: '',
      filters: [
        {
          name: 'likes',
          label: 'by likes',
          isActive: false,
          descending: true,
        },
        {
          name: 'rating',
          label: 'by rating',
          isActive: false,
          descending: true,
        },
      ],
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const searchInputValue = event.target.searchInput.value;
    // const { searchInputValue } = this.state;
    // const { onSearch } = this.props;
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    this.props.setSearchInputValue(searchInputValue);
    // onSearch(searchInputValue);
    // this.setState(({ searchInputValue: '' }));
  };

  onInputChange = (event) => {
    this.setState(({ searchInputValue: event.target.value }));
  };

  onFilterButtonClick = (clickedButtonName) => {
    const { onFilterChange } = this.props;
    const { filters } = this.state;
    const currentButton = filters.find(({ name }) => name === clickedButtonName);

    const updatedButton = {
      ...currentButton,
      isActive: true,
      descending: currentButton.isActive ? !currentButton.descending : true,
    };
    const updatedFilters = filters.map((item) => (item.name === clickedButtonName
      ? updatedButton
      : { ...item, isActive: false }));
    this.setState(() => ({
      filters: updatedFilters,
    }), () => {
      const { filters: updatedWithOrderFilters } = this.state;
      onFilterChange(updatedWithOrderFilters.find(({ name }) => name === clickedButtonName));
    });
  };

  render() {
    const { searchInputValue, filters } = this.state;
    const buttons = filters.map(
      ({
        name,
        label,
        isActive,
        descending,
      }) => {
        const filterButtonClass = isActive ? 'btn-primary' : 'btn-outline-secondary';
        const orderDirectionSpanClass = descending ? 'fa fa-long-arrow-down' : 'fa fa-long-arrow-up';
        return (
          <button
            key={name}
            type="button"
            className={`btn btn-sm ${filterButtonClass}`}
            onClick={() => this.onFilterButtonClick(name)}
          >
            <span>{`${label} `}</span>
            <span className={orderDirectionSpanClass} />
          </button>
        );
      },
    );

    return (
      <div className={styles.filter}>
        <h2 className="mb-2">Sort movies</h2>
        <div className={`${styles.buttons} mb-3`}>
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
            name="searchInput"
          />
        </form>
      </div>
    );
  }
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  // onSearch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setSearchInputValue: (searchInputValue) => dispatch({
    type: 'SET_SEARCH_INPUT_VALUE',
    payload: searchInputValue,
  }),
});

export default connect(null, mapDispatchToProps)(Filter);
