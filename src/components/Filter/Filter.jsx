import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { setFilteredMoviesByTitle, setMoviesOrder } from '../../store/slices/catalog.slice';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

function Filter() {
  const dispatch = useDispatch();
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
    dispatch(setFilteredMoviesByTitle(searchInputValue));
  }, [searchInputValue]);

  useEffect(() => {
    const activeFilter = ([...filters].find(({ isActive }) => isActive === true)) || null;
    dispatch(setMoviesOrder(activeFilter));
  }, [filters]);

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchInputValue(event.target.elements.searchInput.value);
    searchInput.current.value = '';
  };

  const handleFilterButtonClick = (clickedButtonName) => {
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
    const filterButtonClass = cx('btn btn-sm', {
      'btn-primary': isActive,
      'btn-outline-secondary': !isActive,
    });
    const orderDirectionSpanClass = cx({
      'fa fa-long-arrow-down': descending,
      'fa fa-long-arrow-up': !descending,
    });

    return (
      <button
        key={name}
        type="button"
        className={filterButtonClass}
        onClick={() => handleFilterButtonClick(name)}
      >
        <span>{`${label} `}</span>
        <span className={orderDirectionSpanClass} />
      </button>
    );
  });

  const h2ClassName = cx('mb-2');
  const buttonsClassName = cx('buttons', 'mb-3');
  const formClassName = cx('input-group', 'mb-3');
  const searchButtonClassName = cx('btn btn-outline-secondary');
  const searchIconClassName = cx('fa fa-search');
  const inputClassName = cx('form-control');

  return (
    <div className={cx('filter')}>
      <h2 className={h2ClassName}>Sort movies</h2>
      <div className={buttonsClassName}>
        {buttons}
      </div>
      <form
        onSubmit={onSubmit}
        className={formClassName}
      >
        <button type="button" className={searchButtonClassName}>
          <i className={searchIconClassName} />
        </button>
        <input
          className={inputClassName}
          type="text"
          placeholder="Search by name"
          name="searchInput"
          ref={searchInput}
        />
      </form>
    </div>
  );
}

export default Filter;
