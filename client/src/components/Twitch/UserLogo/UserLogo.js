import React from 'react';
import PropTypes from 'prop-types';

import './UserLogo.sass';

const UserLogo = ({ logoSrc, displayName }) => (
  <div className="user-logo">
    <img
      src={logoSrc}
      alt={displayName}
    />
  </div>
);

UserLogo.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
};

export default UserLogo;
