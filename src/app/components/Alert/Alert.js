import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Alert as AntAlert } from 'antd';

const Alert = ({ error, isError }) => (
  <>
    {isError && (
      <div className="alert-wrapper">
        <AntAlert
          message={error.message}
          description={error.stack}
          type="error"
          closable
        />
      </div>
    )}
    ;
  </>
);

export default memo(Alert);

Alert.propTypes = {
  isError: PropTypes.bool,
  error: PropTypes.object
};
