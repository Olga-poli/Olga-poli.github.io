import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMoviesOrderAction, setFilteredMoviesByTitleAction } from '../../store/actions/actions';
import styles from './Filter.module.scss';

function Filter(props) {
  const initialState = [
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
  ];
  const [filters, setStateFilters] = useState(initialState);
  const [searchInputValue, setSearchInputValue] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    const { setFilteredMoviesByTitle } = props;
    setFilteredMoviesByTitle(searchInputValue);
  }, [searchInputValue]);

  useEffect(() => {
    const { setMoviesOrder } = props;
    const activeFilter = ([...filters].find(({ isActive }) => isActive === true));
    setMoviesOrder(activeFilter);
  }, [filters]);

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchInputValue(event.target.elements.searchInput.value);
    searchInput.current.value = '';
  };

  const onFilterButtonClick = (clickedButtonName) => {
    const currentButton = [...filters].find(({ name }) => name === clickedButtonName);
    const updatedButton = {
      ...currentButton,
      isActive: true,
      descending: currentButton.isActive ? !currentButton.descending : true,
    };
    const updatedFilters = [...filters].map((item) => (
      item.name === clickedButtonName
        ? updatedButton
        : { ...item, isActive: false }));

    setStateFilters(updatedFilters);
  };

  const buttons = filters.map(({
    name, label, isActive, descending,
  }) => {
    const filterButtonClass = isActive ? 'btn-primary' : 'btn-outline-secondary';
    const orderDirectionSpanClass = descending ? 'fa fa-long-arrow-down' : 'fa fa-long-arrow-up';
    return (
      <button
        key={name}
        type="button"
        className={`btn btn-sm ${filterButtonClass}`}
        onClick={() => onFilterButtonClick(name)}
      >
        <span>{`${label} `}</span>
        <span className={orderDirectionSpanClass} />
      </button>
    );
  });

  return (
    <div className={styles.filter}>
      <h2 className="mb-2">Sort movies</h2>
      <div className={`${styles.buttons} mb-3`}>
        {buttons}
      </div>
      <form
        onSubmit={onSubmit}
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
          ref={searchInput}
        />
      </form>
    </div>
  );
}

Filter.propTypes = {
  setMoviesOrder: PropTypes.func.isRequired,
  setFilteredMoviesByTitle: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setMoviesOrder: setMoviesOrderAction,
  setFilteredMoviesByTitle: setFilteredMoviesByTitleAction,
};

export default connect(null, mapDispatchToProps)(Filter);
