import React from 'react';

const NotFound = (props) => {
  return (
    <div>
      <p className="no-data">{props.message}</p>
    </div>
  );
};

export default NotFound;