import React from 'react';
import PropTypes from 'prop-types';
import Status from './Status/Status';
import StreamInfo from './StreamInfo/StreamInfo';
import UserLogo from '../../UserLogo/UserLogo';

const StreamerCard = ({ channel, selectStream }) => (
  <li
    role="button"
    title={channel.channel.status}
    tabIndex="-1"
    onClick={() => selectStream(channel.channel.name)}
    onKeyPress={(e) => {
      if (e.key === 'Enter') selectStream(channel.channel.name);
    }}
  >
    <div className="streamer-wrapper">
      <Status viewers={channel.viewers} />
      <UserLogo
        logoSrc={channel.channel.logo}
        displayName={channel.channel.display_name}
      />
      <StreamInfo
        userName={channel.channel.display_name}
        game={channel.game}
      />
    </div>
  </li>
);

StreamerCard.propTypes = {
  channel: PropTypes.object.isRequired, // eslint-disable-line
  selectStream: PropTypes.func.isRequired,
};

export default StreamerCard;
