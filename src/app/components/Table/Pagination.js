import { Pagination } from "antd";
import PropTypes from "prop-types";
import { memo } from "react";

const MyPagination = ({
  total,
  onChange,
  changeSizePage,
  current,
  pageSize,
}) => {
  return (
    <div className="pagination-wrapper">
      <Pagination
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}
        onShowSizeChange={changeSizePage}
      />
    </div>
  );
};

export default memo(MyPagination);

MyPagination.propTypes = {
  total: PropTypes.number,
  onChange: PropTypes.func,
  changeSizePage: PropTypes.func,
  current: PropTypes.number,
  pageSize: PropTypes.number,
};
