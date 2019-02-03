import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SelectedGame from './SelectedGame/SelectedGame';
import GamesMenu from './GamesMenu/GamesMenu';
import { twitchHeaders } from '../../../utils/utils';

import './GameController.sass';

const GameController = ({ selectGame, selectedGame }) => {
  const [topGames, setTopGames] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    getTopGames();
  }, []);

  const getTopGames = async () => {
    try {
      const { data: { top } } = await axios('https://api.twitch.tv/kraken/games/top?limit=100', twitchHeaders);
      setTopGames(top);
    } catch (err) {
      console.log(err);
    }
  };

  const selectGameHandler = (game) => {
    selectGame(game);
    closeGamesMenu();
  };

  const toggleGamesMenu = (e) => {
    e.stopPropagation();
    setMenuIsOpen(!menuIsOpen);
  };

  const closeGamesMenu = () => setMenuIsOpen(false);

  return (
    <div id="search-controller">
      <div className="controls-wrapper">
        <div className="game-controller">
          <SelectedGame
            selectedGame={selectedGame}
            toggleGamesMenu={toggleGamesMenu}
          />
          <GamesMenu
            games={topGames}
            isOpen={menuIsOpen}
            selectGame={selectGameHandler}
          />
        </div>
      </div>
    </div>
  );
};

GameController.propTypes = {
  selectGame: PropTypes.func.isRequired,
  selectedGame:  PropTypes.object, // eslint-disable-line
};

GameController.defaultProps = {
  selectedGame: {},
};

export default GameController;
