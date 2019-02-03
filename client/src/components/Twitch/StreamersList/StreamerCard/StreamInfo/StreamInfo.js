import React from 'react';
import PropTypes from 'prop-types';

const StreamInfo = ({ userName, game }) => (
  <div className="info">
    <div className="name">{userName}</div>
    <div className="game">{game}</div>
  </div>
);

StreamInfo.propTypes = {
  userName: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
};

export default StreamInfo;
