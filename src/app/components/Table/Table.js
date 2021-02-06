import { memo, useState } from "react";
import { Table as AntTable } from "antd";
import PropTypes from "prop-types";
import Pagination from "./Pagination";

const Table = ({ data, pagination, fetchPage, changeSizePage, isLoading }) => {
  return (
    <>
      <AntTable
        rowSelection={{
          type: "checkbox",
        }}
        columns={[
          {
            title: "Label",
            dataIndex: "label",
            key: "label",
            render: (text) => <a>{text}</a>,
          },
        ]}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        rowKey="label"
        scroll={{ y: 340 }}
      />
      <Pagination
        pageSize={pagination.pageSize}
        current={pagination.page}
        total={pagination.totalElements}
        onChange={fetchPage}
        changeSizePage={changeSizePage}
      ></Pagination>
    </>
  );
};

export default memo(Table);

Table.propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  fetchPage: PropTypes.func,
  changeSizePage: PropTypes.func,
  isLoading: PropTypes.bool,
};
