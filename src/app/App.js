// @ts-nocheck
import './styles/App.css';
import 'antd/dist/antd.css';
import { useMemo } from 'react';
import { prop, map, flatMap, pipe, reduce, toPairs } from 'lodash/fp';
import { Table } from './components/Table';
import { usePaginatedQueryOntologies } from './modules/api.ontologies.query';
import Alert from './components/Alert';
import BarChart from './components/BarChart/BarChart';

function App() {
  const {
    state: { isLoading, isError, error, data },
    fetchPage,
    changeSizePage,
    pagination
  } = usePaginatedQueryOntologies();

  const chartData = useMemo(
    () =>
      pipe(
        prop('_embedded.terms'),
        map('label'),
        flatMap((label) => label.split(' ')),
        reduce((acc, label) => {
          acc[label] = (acc[label] && acc[label] + 1) || 1;
          return acc;
        }, {}),
        toPairs
      )(data),
    [data]
  );

  const tableData = useMemo(() => {
    return prop('_embedded.terms', data);
  }, [data]);

  return (
    <>
      <Alert error={error} isError={isError} />
      <BarChart data={chartData} />
      <Table
        isLoading={isLoading}
        data={tableData}
        fetchPage={fetchPage}
        changeSizePage={changeSizePage}
        {...pagination}
      />
    </>
  );
}

export default App;
