import React, { Component } from 'react';
import './MovieTitle.scss';
import PropTypes from 'prop-types';

class MovieTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;
    return (
      <p
        onClick={() => console.log('click')}
        onKeyUp={() => console.log('onKeyUp')}
        className="card-title mb-3"
      >
        {title}
      </p>
    );
  }
}

MovieTitle.defaultProps = {
  title: PropTypes.string,
};

MovieTitle.propTypes = {
  title: PropTypes.string,
};

export default MovieTitle;
