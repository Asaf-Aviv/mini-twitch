import React from 'react';
import PropTypes from 'prop-types';
import GameCard from './GameCard/GameCard';

const GamesMenu = ({ games, isOpen, selectGame }) => (
  <div className={`games-menu ${isOpen ? 'active' : ''}`}>
    <ul>
      {games.map(({ game }) => <GameCard key={game.name} game={game} selectGame={selectGame} />)}
    </ul>
  </div>
);

GamesMenu.propTypes = {
  games: PropTypes.array.isRequired, // eslint-disable-line
  isOpen: PropTypes.bool.isRequired,
  selectGame: PropTypes.func.isRequired,
};

export default GamesMenu;
