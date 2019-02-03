import React, { useState, useEffect } from 'react';
import StreamersList from './StreamersList/StreamersList';
import GameController from './GameController/GameController';
import TwitchSearchBar from './TwitchSearchBar/TwitchSearchBar';
import TwitchPlayer from './TwitchPlayer/TwitchPlayer';
import { twitchFetcher, uniqueFrom } from '../../utils/utils';

import './Twitch.sass';

const Twitch = () => {
  const [streamersList, setStreamersList] = useState([]);
  const [channelsDetails, setChannelsDetails] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loadMoreStreamersQuery, setLoadMoreStreamersQuery] = useState(null);
  const [selectedStream, setSelectedStream] = useState(null);

  useEffect(() => {
    if (selectedGame) {
      updateStreamersList(selectedGame._id);
    }
  }, [selectedGame]);

  const selectGame = (game) => {
    if (selectedGame && game._id === selectedGame._id) return;

    setSelectedGame(game);
    document.querySelector('#streamers-side-bar > ul').scrollTop = 0;
  };

  const getChannels = async (streamers) => {
    const queryString = streamers.map(s => s.user_id).join(',');

    const { data } = await twitchFetcher(`https://api.twitch.tv/kraken/streams/?channel=${queryString}`);
    return data.streams;
  };

  const getStreamersList = async (gameId, pagination = '') => {
    const paginationQuery = pagination ? `&after=${pagination}` : '';

    const { data } = await twitchFetcher(`https://api.twitch.tv/helix/streams?game_id=${gameId}${paginationQuery}`);

    return [data.data, data.pagination.cursor];
  };

  const updateStreamersList = async (gameId) => {
    try {
      setLoadingList(true);

      const [streamersListData, loadMoreQuery] = await getStreamersList(gameId);
      const channelsDetailsData = await getChannels(streamersListData);

      setStreamersList(streamersListData);
      setLoadMoreStreamersQuery(loadMoreQuery);
      setChannelsDetails(channelsDetailsData);
      setLoadingList(false);
    } catch (err) {
      stopLoading();
    }
  };

  const loadMoreStreamers = async (pagination) => {
    try {
      setLoadingList(true);
      const gameId = selectedGame._id;

      const [loadedStreamersList, loadMoresQuery1] = await getStreamersList(gameId, pagination);
      const loadedChannelsDetails = await getChannels(loadedStreamersList);

      setStreamersList(uniqueFrom([...streamersList, ...loadedStreamersList], 'user_id', 'left'));
      setChannelsDetails(uniqueFrom([...channelsDetails, ...loadedChannelsDetails], '_id', 'right'));
      setLoadMoreStreamersQuery(loadMoresQuery1);
      setLoadingList(false);
    } catch (err) {
      stopLoading();
    }
  };

  const selectStream = (channelName) => {
    if (!selectedStream || selectedStream !== channelName) {
      setSelectedStream(channelName);
      embedPlayer(channelName);
    }
  };

  const embedPlayer = (channelName) => {
    removePlayer();

    new window.Twitch.Embed('twitch-player', { // eslint-disable-line
      channel: channelName,
      width: '100%',
      height: '100%',
      theme: 'dark',
    });

    document.querySelector('.close-btn').style.display = 'block';
  };

  const closeStream = () => {
    setSelectedStream(null);
    removePlayer();
  };

  const removePlayer = () => {
    const twitchPlayer = document.querySelector('#twitch-player iframe');

    if (twitchPlayer) {
      twitchPlayer.parentNode.removeChild(twitchPlayer);
      document.querySelector('.close-btn').style.display = 'none';
    }
  };

  const stopLoading = () => setLoadingList(false);

  return (
    <div id="twitch-wrapper" className="d-flex">
      <StreamersList
        streamersList={streamersList}
        loadMorePagination={loadMoreStreamersQuery}
        channelsDetails={channelsDetails}
        loadMore={loadMoreStreamers}
        isLoading={loadingList}
        selectStream={selectStream}
      />
      <div id="main-column-wrapper">
        <TwitchSearchBar selectStream={selectStream} />
        <TwitchPlayer
          selectedStream={selectedStream}
          closeStream={closeStream}
        />
        <GameController
          selectedGame={selectedGame}
          selectGame={selectGame}
        />
      </div>
    </div>
  );
};

export default Twitch;
