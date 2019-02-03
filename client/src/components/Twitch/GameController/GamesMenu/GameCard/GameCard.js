import React from 'react';
import PropTypes from 'prop-types';

const GameCard = ({ game, selectGame }) => (
  <li
    role="button"
    tabIndex="0"
    title={game.name}
    onClick={() => selectGame(game)}
    onKeyPress={(e) => {
      if (e.key === 'Enter') selectGame(game);
    }}
  >
    <div className="game-wrapper">
      <div className="logo">
        <img src={game.box.medium} alt={`${game.name} logo`} />
      </div>
    </div>
  </li>
);

GameCard.propTypes = {
  game: PropTypes.object, // eslint-disable-line
  selectGame: PropTypes.func.isRequired,
};

export default GameCard;
