import React from 'react';
import PropTypes from 'prop-types';

const LoadMoreButton = ({ loadMore, loadMorePagination }) => (
  <button
    type="button"
    className="load-more-btn"
    onClick={() => loadMore(loadMorePagination)}
  >
    Load More
  </button>
);

LoadMoreButton.propTypes = {
  loadMore: PropTypes.func.isRequired,
  loadMorePagination: PropTypes.string.isRequired,
};

export default LoadMoreButton;
