import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Filter.module.scss';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      inputValue: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    const { setSearchInputValue } = this.props;
    setSearchInputValue(inputValue);
    this.setState({ inputValue: '' });
  };

  onFilterButtonClick = (clickedButtonName) => {
    const { setMoviesOrder } = this.props;
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
      setMoviesOrder(updatedWithOrderFilters.find(({ name }) => name === clickedButtonName));
    });
  };

  render() {
    const { filters, inputValue } = this.state;
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
            className="form-control"
            type="text"
            placeholder="Search by name"
            name="searchInput"
            value={inputValue}
            onChange={(event) => {
              this.setState(({ inputValue: event.target.value }));
            }}
          />
        </form>
      </div>
    );
  }
}

Filter.propTypes = {
  setMoviesOrder: PropTypes.func.isRequired,
  setSearchInputValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  searchInputValue: state.appReducer.searchInputValue,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchInputValue: (searchInputValue) => dispatch({
    type: 'SET_SEARCH_INPUT_VALUE',
    payload: searchInputValue,
  }),
  setMoviesOrder: (activeButton) => dispatch({
    type: 'SET_MOVIES_ORDER',
    payload: activeButton,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
