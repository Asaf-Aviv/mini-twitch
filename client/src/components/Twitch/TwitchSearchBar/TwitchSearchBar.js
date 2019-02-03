import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchResults from './SearchResults/SearchResults';
import Loader from '../Loader/Loader';
import { twitchFetcher } from '../../../utils/utils';

import './TwitchSearchBar.sass';

const TwitchSearchBar = ({ selectStream }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    searchUser();
  }, [username]);

  const searchUser = async () => {
    if (username.length < 3) return;

    setIsLoading(true);

    try {
      const res = await twitchFetcher(`https://api.twitch.tv/helix/users?login=${username}`);
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const openChannel = (channelName) => {
    selectStream(channelName);
    setUsername('');
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      openChannel(username);
    }
  };

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">
        <div className="results-wrapper">
          <input
            type="text"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            value={username}
            placeholder="Search"
          />
          <div className="searchbar-results">
            {isLoading && <Loader /> }
            {username && !isLoading && (
              <SearchResults
                selectStream={openChannel}
                users={users}
                showResults={username.length > 2}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TwitchSearchBar.propTypes = {
  selectStream: PropTypes.func.isRequired,
};

export default TwitchSearchBar;
