import "./styles/App.css";
import { useCallback, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table } from "./components/Table";
import OntologiesService from "./modules/api.ontologies.service";
import { prop, map, flatMap, pipe, reduce, toPairs } from "lodash/fp";
import Alert from "./components/Alert";
import BarChart from "./components/BarChart/BarChart";

function App() {
  const [data, setData] = useState({ tableData: [], chartData: [] });
  const [status, setStatus] = useState({ isLoading: false });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    totalPages: 0,
    totalElements: 0,
  });
  const [error, setError] = useState({
    isError: false,
    description: "",
  });

  const fetchPage = (page) => {
    setPagination((pagination) => ({ ...pagination, page }));
  };

  const changeSizePage = (page, pageSize) => {
    setPagination({ ...pagination, page, pageSize });
  };

  const onClose = useCallback(() => setError({ ...error, isError: false }), [
    error,
  ]);

  useEffect(() => {
    setStatus({ isLoading: true });
    OntologiesService.fetch({
      page: pagination.page,
      size: pagination.pageSize,
    })
      .then(({ data }) => {
        const chartData = pipe(
          prop("_embedded.terms"),
          map("label"),
          flatMap((label) => label.split(" ")),
          reduce((acc, label) => {
            acc[label] = (acc[label] && acc[label] + 1) || 1;
            return acc;
          }, {}),
          toPairs
        )(data);

        setData({ tableData: prop("_embedded.terms", data), chartData });
        setPagination({
          ...pagination,
          pageSize: prop("page.size", data),
          totalElements: prop("page.totalElements", data),
          totalPages: prop("page.totalPages", data),
        });
        setStatus({ isLoading: false });
        setError({ ...error, isError: false });
      })
      .catch(({ response }) => {
        setError({
          ...error,
          isError: true,
          description: prop("data.error", response),
        });
      });
  }, [pagination.page, pagination.pageSize]);

  return (
    <>
      <Alert error={error} onClose={onClose}></Alert>
      <BarChart chartData={data.chartData}></BarChart>
      <Table
        isLoading={status.isLoading}
        data={data.tableData}
        pagination={pagination}
        fetchPage={fetchPage}
        changeSizePage={changeSizePage}
      ></Table>
    </>
  );
}

export default App;
