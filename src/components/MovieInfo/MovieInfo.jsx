import React from 'react';
import './MovieInfo.scss';

function MovieInfo() {
  return (
    <div className="MovieInfo col">
      <aside>
        <h3>Titanic</h3>
        <span>
          <span>
            Likes:
            <span>4</span>
          </span>
        </span>
      </aside>
      <div>
        <div>
          <img src="" alt="Titanic" />
        </div>
        <div>
          <p>
            Director:
            <span>Cameron</span>
          </p>
          <p>
            Actors:
            <span>Di Caprio</span>
          </p>
          <p>
            Genres:
            <span>Abra</span>
          </p>
          <p>
            Description:
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, dolore </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
