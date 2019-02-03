import React from 'react';
import PropTypes from 'prop-types';
import UserLogo from '../../UserLogo/UserLogo';

const SearchResults = ({ users, showResults, selectStream }) => {
  if (!users.length && showResults) {
    return <div style={{ textAlign: 'center', padding: '1rem', color: '#fff' }}>No Users found.</div>;
  }

  return users.map(user => (
    <div
      tabIndex="0"
      role="link"
      className="user-wrapper"
      onClick={() => selectStream(user.display_name)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') selectStream(user.display_name);
      }}
      title={user.description}
      key={user.id}
    >
      <UserLogo logoSrc={user.profile_image_url} displayName={user.display_name} />
      <div className="name">{user.display_name}</div>
      <div className="views">
        <i className="far fa-eye" title="Channel Views">
          <span>{user.view_count.toLocaleString()}</span>
        </i>
      </div>
    </div>
  ));
};

SearchResults.propTypes = {
  SearchResults: PropTypes.arrayOf(),
  showResults: PropTypes.bool.isRequired,
  selectStream: PropTypes.func,
};

export default SearchResults;
