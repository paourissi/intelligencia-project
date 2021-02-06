import { memo, useEffect, useState } from 'react';
import { Table as AntTable } from 'antd';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Pagination from './Pagination';

const Table = ({
  data,
  page,
  pageSize,
  totalElements,
  fetchPage,
  changeSizePage,
  isLoading
}) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    isEmpty(data) ? '' : setTableData(data);
  }, [data]);

  return (
    <>
      <AntTable
        columns={[
          {
            title: 'Label',
            dataIndex: 'label',
            key: 'label'
          },
          {
            title: 'Ontology_name',
            dataIndex: 'ontology_name',
            key: 'ontology_name'
          },
          {
            title: 'OBO ID',
            dataIndex: 'obo_id',
            key: 'obo_id'
          }
        ]}
        dataSource={tableData}
        loading={isLoading}
        pagination={false}
        rowKey="label"
        scroll={{ y: 340 }}
      />
      <Pagination
        pageSize={pageSize}
        current={page}
        total={totalElements}
        onChange={fetchPage}
        changeSizePage={changeSizePage}
      ></Pagination>
    </>
  );
};

export default memo(Table);

Table.propTypes = {
  data: PropTypes.array,
  totalElements: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
  fetchPage: PropTypes.func,
  changeSizePage: PropTypes.func,
  isLoading: PropTypes.bool
};
