import React from 'react';
import PropTypes from 'prop-types';
import StreamerCard from './StreamerCard/StreamerCard';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';
import Loader from '../Loader/Loader';

import './StreamersList.sass';

const StreamersList = ({
  isLoading, channelsDetails, loadMorePagination, selectStream,
  loadMore,
}) => (
  <div id="streamers-side-bar">
    {isLoading && <Loader />}
    <ul>
      {channelsDetails.map(channel => (
        <StreamerCard
          key={channel._id}
          channel={channel}
          selectStream={selectStream}
        />
      ))}
    </ul>
    {loadMorePagination
      && (
      <LoadMoreButton
        loadMore={loadMore}
        loadMorePagination={loadMorePagination}
      />
      )
    }
  </div>
);

StreamersList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  channelsDetails: PropTypes.array.isRequired, // eslint-disable-line
  loadMorePagination: PropTypes.string,
  selectStream: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};

StreamersList.defaultProps = {
  loadMorePagination: null,
};

export default StreamersList;
