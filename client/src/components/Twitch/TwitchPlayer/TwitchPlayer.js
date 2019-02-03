import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../../assets/icons/close.svg';

import './TwitchPlayer.sass';

const TwitchPlayer = ({ closeStream }) => (
  <div id="twitch-player">
    <button type="button" className="close-btn" onClick={closeStream}>
      <img src={closeIcon} alt="close" />
    </button>
  </div>
);

TwitchPlayer.propTypes = {
  closeStream: PropTypes.func.isRequired,
};

export default TwitchPlayer;
