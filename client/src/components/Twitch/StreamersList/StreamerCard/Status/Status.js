import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ viewers }) => (
  <div className="status">
    <span>{viewers.toLocaleString()}</span>
    <div className="circle" />
  </div>
);

Status.propTypes = {
  viewers: PropTypes.number.isRequired,
};

export default Status;
