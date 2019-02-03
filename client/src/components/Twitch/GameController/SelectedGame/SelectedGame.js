import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as HandIcon } from '../../../../assets/icons/hand.svg';

const SelectedGame = ({ selectedGame, toggleGamesMenu }) => (
  <div
    role="button"
    tabIndex="0"
    className="selected-game"
    onClick={toggleGamesMenu}
    onKeyPress={(e) => {
      if (e.key === 'Enter') toggleGamesMenu(e);
    }}
  >
    {selectedGame
      ? <img src={selectedGame.box.medium} alt={selectedGame.name} />
      : (
        <div style={{ color: '#00ffe7' }}>
          SELECT GAME
          <HandIcon className="game-pointer" />
        </div>
      )
    }
  </div>
);

SelectedGame.propTypes = {
  selectedGame: PropTypes.object, // eslint-disable-line
  toggleGamesMenu: PropTypes.func.isRequired,
};

export default SelectedGame;
