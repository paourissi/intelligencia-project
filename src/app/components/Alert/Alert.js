import React, { memo } from "react";
import PropTypes from "prop-types";
import { Alert as AntAlert } from "antd";

const Alert = ({ error, onClose }) => {
  return (
    <>
      {error.isError && (
        <div className="alert-wrapper">
          <AntAlert
            message="Error when fetching data"
            description={error.description}
            type="error"
            closable
            onClose={onClose}
          />
        </div>
      )}
      ;
    </>
  );
};

export default memo(Alert);

Alert.propTypes = {
  onClose: PropTypes.func,
  error: PropTypes.object,
};
